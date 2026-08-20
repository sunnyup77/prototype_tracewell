const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  hobbies: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Student", studentSchema);