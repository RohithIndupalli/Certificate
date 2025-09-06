/**
 * Authentication utilities for managing user sessions
 */

// Store user session
export const setUserSession = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('sessionTime', new Date().getTime());
};

// Get current user data
export const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const authenticated = localStorage.getItem('isAuthenticated');
  const sessionTime = localStorage.getItem('sessionTime');
  
  // Session timeout after 24 hours (86400000 ms)
  if (authenticated && sessionTime) {
    const currentTime = new Date().getTime();
    const sessionDuration = currentTime - parseInt(sessionTime);
    
    if (sessionDuration > 86400000) {
      // Session expired
      clearUserSession();
      return false;
    }
    return true;
  }
  return false;
};

// Clear user session (logout)
export const clearUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('sessionTime');
};

// Refresh session time
export const refreshSession = () => {
  if (isAuthenticated()) {
    localStorage.setItem('sessionTime', new Date().getTime());
    return true;
  }
  return false;
};