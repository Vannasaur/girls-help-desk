const router = require('express').Router();

const {
renderDashboard,
renderLogin,
renderTicket
} = require('../controllers/handlebarsControllers')

//route for dashboard page
router.route('/status:?')
.get(renderDashboard);

//route for login page
router.route('/login')
.get(renderLogin)

//route for ticket page
router.route('/ticket')
.get(renderTicket)

module.exports = router;
