import './models/User'
require('dotenv').config({path: 'variables.env'})
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import cookieParser from 'cookie-parser'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session)
import passport from 'passport'
import routes from './routes/index'
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(err.message)
})
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
  }),
)

// // Passport JS is what we use to handle our logins
app.use(passport.initialize())
app.use(passport.session())
require('./routes/index')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/dist'))

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
