const router = require('express').Router();

const userRoutes = require('./user-routes');
const logRoutes = require('./logRoutes');
const ticketRoutes = require('./ticketRoutes');

router.use('/users', userRoutes);
router.use('/log', logRoutes);
router.use('/ticket', ticketRoutes);


module.exports = router;