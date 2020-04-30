// from OAuth APIs sample
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-auth-delo.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://dev-auth-delo.com/apis',
    issuer: 'https://dev-auth-delo.auth0.com/',
    algorithms: ['RS256']
});

app.use(cors()); //for cross over ports
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.json({message: 'This is a secured Resource'});
});

app.listen(port);
console.log('Server running on 8080');