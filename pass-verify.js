const bcrypt = require('bcrypt');

async function verifyPassword(){
const myPassword = 'admin 123 .00';
const hash = '$2b$10$wn/ybeJePJawupEnE17XMusz7nFqe.PCTjlaH7.IqIXTSe1SUBkfe';
const isMatch = await bcrypt.compare(myPassword, hash)
console.log(isMatch)
}

verifyPassword();
