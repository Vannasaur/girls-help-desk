const { Ticket } = require('../models');


module.exports = {
    // Create new ticket
    createTicket: async function (req, res) {
        try {
            const createTicketData = await Ticket.create({
                clientId: req.session.user_id,
                subject: req.body.subject,
                description: req.body.description,
                urgency: req.body.urgency,
            });
            console.log(createTicketData);
            // Redirect to the newly created ticket page
            return res.redirect(`/ticket/${createTicketData.id}`);

        } catch (err) {
            console.error(err);
            // Provide an error response to the client
            res.status(500).send('Error creating the ticket');
        }
    },

    editTicket: async (req, res) => {
        try {
            console.log("This is the Edit Ticket function try block!");

            const { id } = req.params;
            let ticket = await Ticket.findByPk(id);

            if (!ticket) {
                return res.status(404).send("Ticket not found.");
            }

            // Capture original ticket data before changes
            const originalData = ticket._previousDataValues;

            // console.log(originalData);

            // Update ticket
            for (let key in req.body) {
                console.log(key);
                ticket[key] = req.body[key];
            }

            // If a techId was added, change status to Claimed
            // if (req.session.role === 'tech') {
            //     // line 48 is needed for Claim-btn techId
            //     //ticket.techId = req.session.user_id; // this is not needed, tech should be able to reassign a ticket to another tech
            //     ticket.status = 'Claimed';
            // }

            console.log('this is current ticket' + ticket.dataValues);
            console.log('this is original data:' + originalData);

            if (req.session && req.session.user_id) {
                await ticket.logChange(req.session.user_id, originalData);
                await ticket.save();
            }

            return res.status(200).json({ message: "Ticket updated successfully." });

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
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