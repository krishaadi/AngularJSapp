const express = require('express');
const path = require('path');
const app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');


//for jwt and APis registered in OAuth 
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

// Serve static files....
app.use(express.static(__dirname + '/'));

// Send all requests to index.html
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(cors()); //for cross over ports
app.use(jwtCheck);

// get authorization from the server
app.get('/authorized', function (req, res) {
  res.json({message: 'Calling node js server and returning authentication'});
 // res.send("Hello");
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
console.log("Server running at 3000");
