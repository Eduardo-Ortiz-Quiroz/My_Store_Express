const jwt = require('jsonwebtoken');

const mySecret = 'myCat'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NDk3MTU3MX0._tWDaUNgUNpGNMEQz0uwbuILthfEVUWl_tzGPnbRIYQ'

function verifyToken(token, mySecret){
  return jwt.verify(token, mySecret);
}

const payload = verifyToken(token, mySecret)

console.log(payload)
