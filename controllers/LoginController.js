// Controlador para el login:
class LoginController {
  index(req, res, next) {
    res.render('login');
  }
}

module.exports = LoginController;