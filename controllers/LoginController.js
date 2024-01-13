// Cargamos el modelo:
const User = require('../models/User');

// Importamos la libreria JWT:
const jwt = require('jsonwebtoken');

// Controlador para el login:
class LoginController {
  index(req, res, next) {
    res.render('login');
  }

  // Método para el JWT de la api:
  async postJWT(req, res, next) {
    // console.log(req.body)
    try {
      // Extraemos los datos del body:
      const { email, password } = req.body;

      // Comprobamos que exista en bd el usuario:
      const user = await User.findOne({
        email: email,
      });

      // Si no lo encuentra o contraseña mal retorno -> error:
      if (!user || !(await user.comparePassword(password))) {
        // Respondemos con un json:
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // si existe y la constraseña coincide --> devuelvo un JWT:
      // el metodo sing recibe tres parametros, 1 un {} con lo deseamos enviar, 2 la clave secreta, es un valor aleatoro puesto por nosotros, 3 un objeto de opciones con la expiracion del token:
      const tokenJWT = await jwt.sign(
        { _id: user._id },
        's876ads87dasuytasduytasd',
        {
          expiresIn: '2h',
        }
      );

      // Devolvemos el token en un {} en formato json:
      res.json({ jwt: tokenJWT });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
