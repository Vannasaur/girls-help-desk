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
            const { id } = req.params.id;
            const editTicketData = await Ticket.findbyPk(id);
            const oldData = editTicketData._previousDataValues;
            console.log(oldData)

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
                editTicketData.techId  = req.session.user_idtechId;
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

    // editTicket: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         let ticket = await Ticket.findByPk(id);

    //         if (!ticket) {
    //             return res.status(404).send("Ticket not found.");
    //         }

    //         // Capture original ticket data before changes
    //         const oldData = ticket._previousDataValues;
    //         // console.log(oldData);

    //         // Update ticket
    //         for (let key in req.body) {
    //             console.log(key);
    //             ticket[key] = req.body[key];
    //         }

    //         // If a techId was added, change status to Claimed
    //         if (req.body.techId) {
    //             // Need line 48 is needed for Claim-btn techId
    //             ticket.techId = req.session.user_id;
    //             ticket.status = 'Claimed';
    //         }

    //         console.log(ticket);


    //         // if (req.session && req.session.user_id) {
    //         //     await ticket.save();
    //         //     await ticket.logChange(ticket.dataValues, originalData);
    //         //     console.log('this happened');
    //         // }

    //         //await ticket.save();
    //         console.log('this is userid: \n');
    //         console.log(req.session.user_id);
    //         await ticket.logChange(req.session.user_id, oldData);
    //         console.log('this happened');

    //         // await ticket.logChange(ticket.dataValues, originalData);
    //         // console.log(ticket);

    //         //return res.redirect(`/api/ticket/${id}`);

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send("Server Error");
    //     }
    // },

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