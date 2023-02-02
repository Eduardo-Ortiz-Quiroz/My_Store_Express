const boom = require('@hapi/boom');
const UserService = require('./users.service');
const service = new UserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config')
const nodemailer = require('nodemailer');

class AuthService{
  async getUser(email, password){
    const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized('usuario o contraseña no valida');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized('usuario o contraseña no valida');
      }
      delete user.dataValues.password;
      return user;
  }

    async signToken(user){
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = await jwt.sign(payload, config.jwtSecret)
      return {
        user,
        token,
      };
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.jwtSecretRecovery, {expiresIn: '15min'})
    const link = `https://edu-expressapp.up.railway.app/recovery-password?token=${token}`
    await service.update(user.id, {recoveryToken: token})
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar tu contraseña",
      html: `<b>Ingresa a este link para recuperar tu contraseña => ${link}</b>`,
    }
    const res = await this.sendMail(mail);
    return res;
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, {recoveryToken: null, password: hash})
      return {message: 'password changed'}
    } catch (err) {
      throw boom.unauthorized();
    }
  }

}
module.exports = AuthService;
