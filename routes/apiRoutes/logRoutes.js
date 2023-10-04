const router = require('express').Router();

const {
  createLog,
  editLog,
  deleteLog
} = require('../../controllers/logControllers')

router.route('/api/log/:ticketId?drawer=BOOLEAN')
    .post(createLog);

router.route('/api/log/:ticketId/:logId?drawer=BOOLEAN')
    .put(editLog)
    .delete(deleteLog);

module.exports = router;