const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// modulo que exporta un middleware:

module.exports = async (req, res, next) => {
  try {
    // recoger el jwtToken de la cabecera o del body o de la query string:
    const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;

    // comprobar que mandado un jwtToken:
    if (!jwtToken) {
      next(createError(401, 'no token provided'));
      return;
    }

    // comprobaremos que el token es valido: Usamos la libreria jsonwebtoken:
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        next(createError(401, 'invalid token'));
        return;
      }

      // Apuntamos el usuario loguedo en la request: Asi ya tendremos esa informacion del usuario disponible para cualquier otro middleware: Lo vemos en el middleware api/agentes.js
      req.userLoggedAPI = payload._id;

      // dejamos pasar al siguiente middleware:
      next();
    });
  } catch (err) {
    next(err);
  }
};
