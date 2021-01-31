const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
  name : {
    type : String
  }, 
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Part', partSchema)