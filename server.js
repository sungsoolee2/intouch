require("dotenv").config();
console.log(require("dotenv").config());
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path")
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));

// Okta auth middleware
app.use(
    require('express-session')({
      secret: process.env.APP_SECRET,
      resave: true,
      saveUninitialized: false
    })
  );
  
  const { ExpressOIDC } = require('@okta/oidc-middleware');
  const oidc = new ExpressOIDC({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
    scope: 'openid profile',
    appBaseUrl: "http://localhost:3000"
  });
  
  app.use(oidc.router);

// Okta registration page
app.use('/register', require('./routes/register'));

// Okta logout route
app.get('/logout', (req, res) => {
    if (req.userContext) {
      const idToken = req.userContext.tokens.id_token;
      const to = encodeURI(process.env.HOST_URL);
      const params = `id_token_hint=${idToken}&post_logout_redirect_uri=${to}`;
      req.logout();
      res.redirect(
        `${process.env.OKTA_ORG_URL}/oauth2/default/v1/logout?${params}`
      );``
    } else {
      res.redirect('/');
    }
  });
app.use('/', require('./routes/index'));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "handlebars");

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
//    });
   
//    io.on('connection', function(socket){
//     console.log('a user connected');
//    });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
