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

/*customerSchema.pre('validate', function(next) {
  if (this.firstName) {
    this.slug = slugify(this.firstName, { lower: true, strict: true })
  }

  if (this.description) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.description))
  }

  next()
})*/

module.exports = mongoose.model('Customer', customerSchema)