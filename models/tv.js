const mongoose = require('mongoose')

const tvSchema = new mongoose.Schema({
  brandName: {
    type: String
  },
  model: {
    type: String
  },
  inch: {
    type: Number
  },
  status: {
    type: String,
    default: "Sprawny"
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tv', tvSchema)