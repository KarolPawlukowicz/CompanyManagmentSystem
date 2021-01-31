const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const customerSchema = new mongoose.Schema({
  firstName : {
    type : String
  },
  lastName : {
    type : String
  },
  email : {
    type: String
  },
  phoneNumber : {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Przyjeto"
  },  
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Customer', customerSchema)