import mongoose from 'mongoose'
import validator from 'validator'
import mongodbErrorHandler from 'mongoose-mongodb-errors'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
