const router = require('express').Router();
const { withAuth } = require('../utils/helpers');

const {
renderDashboard,
renderLogin,
renderTicket
} = require('../controllers/handlebarsControllers')

//route for dashboard page
router.route('/status:?')
.get(withAuth, renderDashboard);

//route for login page
router.route('/login')
.get(renderLogin)

//route for ticket page
router.route('/ticket')
.get(withAuth, renderTicket)

module.exports = router;
