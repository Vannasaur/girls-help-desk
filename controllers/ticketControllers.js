const { Ticket } = require('../models');

module.exports = {
    // Create new ticket
    createTicket: async function (req, res) {
        try {
            const createTicketData = await Ticket.create({
                subject: req.body.subject,
                description: req.body.description,
                urgency: req.body.urgency,
                clientId: req.session.user_id
            });
            // Redirect to the newly created ticket page
            res.redirect(`/ticket/${createTicketData.id}`);

        } catch (err) {
            console.error(err);
            // Provide an error response to the client
            res.status(500).send('Error creating the ticket');
        }
    },
    // Edit ticket
    editTicket: async function (req, res) {

        try { // find the ticket with selected id
            const editTicketData = await Ticket.findbyPk(req.params.id);
            const oldData = {...editTicketData};
            if (!editTicketData) {
                return res.status(404).send('Ticket not found');
            }
            // set changes based on req.body
            if (req.body.subject) {
                editTicketData.subject = req.body.subject;
            }
            if (req.body.description) {
                editTicketData.description = req.body.description;
            }
            if (req.body.techId) {
                editTicketData.techId  = req.session.user_id;
                    // If a new techId is added, update the status to "Claimed"
                    editTicketData.status = 'Claimed';
            }
            // Save changes to the database
            await editTicketData.save();

            // Invoke the logChange instance method
            await editTicketData.logChange(req.session.user_id, oldData);

            // Redirect back to the referrer location
            res.redirect(`/ticket/${editTicketData.id}`)

        } catch (err) {
            console.error(err);
            // Provide an error response to the client
            res.status(500).send('Error updating the ticket');
        }
    },
    // Archive Ticket
    archiveTicket: async function (req, res) {
        try {
            const archiveTicket = await Ticket.findOne({
                id: req.params.id
            },
            {
                where: {
                    status: 'Resolved',
                }
            });
            if (archiveTicket.isArchived === false) {
                archiveTicket.isArchived === true
            }
            // Save changes to the database
            await archiveTicket.save();

            // Redirect back to the referrer location
            res.redirect(`/ticket/${archiveTicket.id}`);

        } catch (err) {
            console.error(err);
        // Provide an error response to the client
        res.status(500).send('Error updating the ticket');
        }
    }
};