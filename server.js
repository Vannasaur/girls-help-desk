require('dotenv').config(); 
// Bring in Node_Modules imports
const path = require('path');
const express = require('express'); //for our server
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./routes');
const helpers = require('./utils/helpers'); 
const sequelize = require('./utils/connection'); 

// Apply middleware
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); 

app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// session behavior
//used for user authentication
const sess = {
secret: process.env.SECRET,
cookie: {},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
db: sequelize 
})
};

// Add express-session and store as Express.js middleware
app.use(session(sess)); 

app.use(routes);
// sync db
// start server
sequelize.sync({ force: false }).then(() => { 
app.listen(PORT, () => console.log('Now listening'));
});