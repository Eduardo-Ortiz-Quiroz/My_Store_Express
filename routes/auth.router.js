const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/auth.service');
const { route } = require('./profile.router');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(await service.signToken(user))
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) =>{
    try {
      const {email} = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
)

router.post('/change-password',
  async(req, res, next) =>{
    try {
      const { token , newPassword} = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
