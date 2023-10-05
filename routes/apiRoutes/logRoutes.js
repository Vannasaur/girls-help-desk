const router = require('express').Router();

const {
  createLog,
  editLog,
  deleteLog
} = require('../../controllers/logControllers')

router.route('/:ticketId?drawer=BOOLEAN')
    // POST will call the createLog controller.
    .post(createLog);

router.route('/:ticketId/:logId?drawer=BOOLEAN')
    // PUT will call the editLog controller.
    // DELETE will call the deleteLog controller.
    .put(editLog)
    .delete(deleteLog);

module.exports = router;