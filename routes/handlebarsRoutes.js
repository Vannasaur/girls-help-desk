const router = require('express').Router();
const { withAuth } = require('../utils/helpers');

const {
renderDashboard,
renderLogin,
renderTicket
} = require('../controllers/handlebarsControllers')

//route for login page
router.route('/login')
.get(renderLogin)

//route for drawer to stay open after creating message/log
router.route('/ticket/:id?drawer=BOOLEAN')
.get(withAuth, renderTicket)

//route for ticket page
router.route('/ticket/:id')
.get(withAuth, renderTicket)

//route for dashboard page
router.route('/:status?')
.get(withAuth, renderDashboard);

module.exports = router;
