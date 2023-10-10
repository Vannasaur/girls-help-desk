const { Log } = require('../models');

module.exports = {
    // CREATE new log
    createLog: async function (req, res) {
        try {
            const newLog = await Log.create({
                userId: req.session.user_id,
                ticketId: req.params.ticketId,
                message: req.body.message,
                type: req.body.type
            });
            const redirect = req.query.drawer==='true'
            ? `/ticket/${newLog.ticketId}?drawer=true`: `/ticket/${newLog.ticketId}`

            console.log(redirect);

            res.redirect(redirect);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // EDIT Log
    editLog: async function (req, res) {
        try { // find log with selected id
            const updatedLog = await Log.findbyPK(req.params.logId);
            // set changes based on req.body
            if (req.body.message) {
                updatedLog.message = req.body.message
            }
            if (req.body.type) {
                updatedLog.type = req.body.type
            }

            // Save changes to the database
            await updatedLog.save();
            console.log(updatedLog);

            // Redirect back to the referrer location
            res.redirect(`/log/${updatedLog.id}`)

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE Log
    deleteLog: async function (req, res) {
        if (req.params.logId) {
            req.session.destroy(() => {
                res.status(204).end();
                            
                // Redirect back to the referrer location
                res.redirect(`/log/${newLog.id}`)
            });
        } else {
            res.status(404).end();
        }
    }
};