const router = require('express').Router();

<<<<<<< HEAD
=======
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
>>>>>>> 0c4e5e0ffac56ccdf99c3d89ede2a7e5df57f3f8
