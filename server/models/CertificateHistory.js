const mongoose = require("mongoose");

const CertificateHistorySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  },
  recipientName: { 
    type: String, 
    required: true 
  },
  recipientEmail: { 
    type: String, 
    required: true 
  },
  eventTitle: { 
    type: String, 
    required: true 
  },
  sentDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("CertificateHistory", CertificateHistorySchema);