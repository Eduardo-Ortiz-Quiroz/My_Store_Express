const jwt = require('jsonwebtoken');

const mySecret = 'myCat'

const payload = {
  sub: 1,
  role: 'customer'
}

const jwtConfig = {
  expiresIn: 60,
};
function signToken(payload, mySecret){
  return jwt.sign(payload, mySecret);
}

const token = signToken(payload, mySecret, jwtConfig)

console.log(token)
