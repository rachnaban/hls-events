import userController from '../controllers/userController'
import authController from '../controllers/authController'
module.exports = app => {
  /*app.get('/login', userController.loginForm)
  app.post('/login', authController.login)
  app.get('/register', userController.registerForm)

  app.post(
    '/register',
    userController.validateRegister,
    userController.register,
    authController.login,
  )

  app.get('/logout', authController.logout)

  app.get('/account', authController.isLoggedIn, userController.account)
  app.post('/account', userController.updateAccount)
  app.post('/account/forgot', authController.forgot)
  app.get('/account/reset/:token', authController.reset)
  app.post(
    '/account/reset/:token',
    authController.confirmedPasswords,
    authController.update,
  )*/
  app.get('/', function(req, res, next) {
    res.send({Ok: 'sure'})
  })
}
