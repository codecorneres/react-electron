var mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  profile: String,
  email: String,
  password: String,
  mobileno: String,
  address: String,
  hobbies: String,
  resume: String,
  gender: String,
  qualification: String
});

module.exports = mongoose.model('Form', FormSchema);