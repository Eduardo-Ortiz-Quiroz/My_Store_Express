const { Strategy } = require('passport-local');
const UserService = require('../../../services/users.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized('usuario o contraseña incorrecta'), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized('usuario o contraseña incorrecta'), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = LocalStrategy;
