const User = require('../models/User');
const jwt = require('jsonwebtoken');
class LoginController {
  index(req, res, next) {
    res.render('login');
  }

  // Method for the JWT of the api:
  async postJWT(req, res, next) {
    // console.log(req.body)
    try {
      // We extract the data from the body:
      const { email, password } = req.body;

      // We check that the user exists in the database:
      const user = await User.findOne({
        email: email,
      });

      // If not found or wrong password return -> error:
      if (!user || !(await user.comparePassword(password))) {
        // Respondemos con un json:
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // if it exists and the password matches --> I return a JWT:
      // the sing method receives three parameters, 1 a {} with what we want to send, 2 the secret key, it is a random value set by us, 3 an options object with the expiration of the token:
      const tokenJWT = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );

      // We return the token in a {} in json format:
      res.json({ jwt: tokenJWT });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
