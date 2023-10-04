const { Log } = require('../../models');

module.exports = {
    // CREATE new log
    createLog: async function(req, res) {
        try {
          const newLog = await Log.create({
            userId: req.session.user,
            ticketId: req.params.ticketId,
            message: req.body.message,
            type: "Created"
          });
            res.status(200).json(newLog);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
    

};