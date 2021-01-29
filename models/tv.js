const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

tvSchema.pre('validate', function(next) {
  if (this.description) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.description))
  }

  next()
})

module.exports = mongoose.model('Tv', tvSchema)