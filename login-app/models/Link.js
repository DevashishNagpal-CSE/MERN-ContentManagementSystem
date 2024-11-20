const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  USERID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Link', LinkSchema);
