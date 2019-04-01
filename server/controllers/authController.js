import passport from 'passport'
import crypto from 'crypto'
import mongoose from 'mongoose'

import promisify from 'es6-promisify'
const User = mongoose.model('User')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: 'Failed Login!',
  successRedirect: '/',
  successMessage: 'You are now logged in!',
})

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  res.redirect('/login')
}

exports.forgot = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    req.flash('error', 'No account with that email exists.')
    return res.redirect('/login')
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000 // 1 hour from now
  await user.save()

  res.redirect('/login')
}

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()},
  })
  if (!user) {
    return res.redirect('/login')
  }
  // if there is a user, show the rest password form
  res.render('reset', {title: 'Reset your Password'})
}

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next() // keepit going!
    return
  }

  res.redirect('back')
}

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()},
  })

  if (!user) {
    return res.redirect('/login')
  }

  const setPassword = promisify(user.setPassword, user)
  await setPassword(req.body.password)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  const updatedUser = await user.save()
  await req.login(updatedUser)
  res.redirect('/')
}
