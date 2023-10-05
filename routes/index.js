const app = require('express').Router();

const handlebarsRoutes = require('./handlebarsRoutes');

const apiRoutes = require('./apiRoutes');

app.use('/api', apiRoutes);

app.use('/', handlebarsRoutes);


module.exports =app; 