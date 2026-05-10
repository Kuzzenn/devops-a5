// backend/models/Student.js
// A Mongoose 'schema' defines the shape of documents in MongoDB
 
const mongoose = require('mongoose');
 
const studentSchema = new mongoose.Schema({
  name:   { type: String, required: true,  trim: true },
  regNo:  { type: String, required: true,  unique: true, uppercase: true },
  grade:  { type: String, default: 'N/A' },
  course: { type: String, default: 'CS316' }
}, { timestamps: true }); // adds createdAt and updatedAt automatically
 
module.exports = mongoose.model('Student', studentSchema);
