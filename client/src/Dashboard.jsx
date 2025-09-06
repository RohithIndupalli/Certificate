import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { isAuthenticated, getUserData } from './utils/authUtils';

function Dashboard() {
  const navigate = useNavigate();
  const [certificateHistory, setCertificateHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByEvent, setFilterByEvent] = useState('');
  const [uniqueEvents, setUniqueEvents] = useState([]);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get user data
    const user = getUserData();
    setUserData(user);
    
    if (user && user.id) {
      fetchCertificateHistory(user.id);
    }
  }, [navigate]);
  
  const fetchCertificateHistory = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://certificate-0a2g.onrender.com/certificate-history/${userId}`);
      // If no data is returned, show empty array
      if (!response.data) {
        setCertificateHistory([]);
        return;
      }
      setCertificateHistory(response.data);
      
      // Extract unique event titles for filtering
      const events = [...new Set(response.data.map(item => item.eventTitle))];
      setUniqueEvents(events);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching certificate history:', err);
      setError('Failed to load certificate history. Please try again later.');
      setLoading(false);
    }
  };
  
  // Filter functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDateFilter = (e) => {
    setFilterByDate(e.target.value);
  };
  
  const handleEventFilter = (e) => {
    setFilterByEvent(e.target.value);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilterByDate('');
    setFilterByEvent('');
  };
  
  // Apply filters to certificate history
  const filteredHistory = certificateHistory.filter(item => {
    // Search term filter (name or email)
    const matchesSearch = searchTerm === '' || 
      item.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const itemDate = new Date(item.sentDate).toISOString().split('T')[0];
    const matchesDate = filterByDate === '' || itemDate === filterByDate;
    
    // Event filter
    const matchesEvent = filterByEvent === '' || item.eventTitle === filterByEvent;
    
    return matchesSearch && matchesDate && matchesEvent;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold mb-0">Certificate Dashboard</h1>
        {/* <Link to="/home" className="btn btn-outline-primary d-flex align-items-center">
          <FaHome className="me-2" /> Back to Home
        </Link> */}
      </div>
      
      {/* Filters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <FaFilter className="me-2" /> Filter Certificates
          </h5>
          
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input 
                  type="date" 
                  className="form-control" 
                  value={filterByDate}
                  onChange={handleDateFilter}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filterByEvent}
                onChange={handleEventFilter}
              >
                <option value="">All Events</option>
                {uniqueEvents.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-2">
              <button 
                className="btn btn-secondary w-100" 
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificate History Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading certificate history...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : filteredHistory.length === 0 ? (
        <div className="alert alert-info" role="alert">
          {certificateHistory.length === 0 ? 
            "No certificate emails have been sent yet." : 
            "No results match your filter criteria."}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date Sent</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.recipientName}</td>
                  <td>{item.recipientEmail}</td>
                  <td>{item.eventTitle}</td>
                  <td>{formatDate(item.sentDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Summary */}
      {!loading && !error && certificateHistory.length > 0 && (
        <div className="card mt-4 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title">Summary</h5>
                <p className="card-text mb-0">Total Certificates Sent: <strong>{certificateHistory.length}</strong></p>
                <p className="card-text mb-0">Filtered Results: <strong>{filteredHistory.length}</strong></p>
              </div>
              {userData && (
                <div className="text-end">
                  <p className="card-text mb-0">User: <strong>{userData.name}</strong></p>
                  <p className="card-text mb-0">Email: <strong>{userData.email}</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;