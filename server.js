require('dotenv').config(); //create custom environment variables to protect our user and private variables, keep obscure from git
// Bring in Node_Modules imports
const path = require('path');
const express = require('express'); //for our server
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store); //connection session sequelize and express session work together to provide session data and store session copies into our SQL server

// Bring in the relative modules
//what is the server directly connected to: controllers folder, config folder, helpers folder
const routes = require('./routes');
const helpers = require('./utils/helpers'); //helper functions that don't belong in anywhere specific, can be used by multiple files
const sequelize = require('./config/connection'); //use the msql peer dependency to create the ORM for our application, the data layer (model)

// Apply middleware
//Our middleware functions are going to work in between our client requests and our route handlers that handle them on the server level
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); //handlebars is using helpers function

app.engine('handlebars', hbs.engine); //express handlebars for our view engine that sits on top of our server
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// session behavior
//used for user authentication
//when a cookie gets init by the server and delivered to the client for the client to store, so too does our SQL server store some sesion data related to the user. This makes sure we're communicationg with the same client on our server level
const sess = {
secret: process.env.SECRET, //in the .env file. This is a signature to say that this server created this cookie
cookie: {},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
db: sequelize //sequelize is our configured connection to our SQL server
})
};

// Add express-session and store as Express.js middleware
app.use(session(sess)); // every request has access to req.session object = { cookie, ... }

app.use(routes);
// sync db
// start server
sequelize.sync({ force: false }).then(() => { //force: false - means that data will not be dropped every time you run node server. force: true - you'd have to seed every time you run node server
app.listen(PORT, () => console.log('Now listening'));
});