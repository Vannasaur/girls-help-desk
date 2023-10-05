const router = require('express').Router();

const {
    createTicket,
    editTicket,
    archiveTicket
} = require('../../controllers/ticketControllers');

// The routes will match '/api/ticket' to handle POST requests.
//  POST will call the createTicket controller.
router.route('/') 
    .post(createTicket);

// The routes will also match '/api/ticket/:id' to handle PUT, and DELETE requests.
//  PUT will call the editTicket controller.
//  DELETE will call the archiveTicket controller.
router.route('/:id')
    .put(editTicket)
    .delete(archiveTicket);

module.exports = router;