
const app = require('express').Router();

const withAuth = require('../utils/helpers');

const {Ticket, User} = require('../models');


app.get('/:status?', async (req, res) => {
    const status = req.params.status || '';
    try {
        const ticketData = await Ticket.findAll({
            where: {
                status: status,
                [Op.not]: {
                    isArchived: true,
                },
            },
            include:
                [{ model: User, as: "client" },
                { model: User, as: "tech" }]
        });

        if (!ticketData) {
            return res.status(404).json({
                message: 'No ticket found by that id'
            })
        }

        const tickets = ticketData.map(eachTicket => eachTicket.get({ plain: true }))


        if (tickets.client.id === req.session.user_id) {
            res.render('home', {
                ...tickets,
                loggedIn: req.session.loggedIn,
                title: "Dashboard",
                layout: "main",
                userType: "client"
            })
        }

        if (tickets.tech.id === req.session.user_id) {

            res.render('home', {
                ...tickets,
                loggedIn: req.session.loggedIn,
                title: "Dashboard",
                layout: "main",
                userType: "tech"
            })
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

app.use('/login', async (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/')
    }
    res.render('login');
})


app.get('/ticket/:id', async (req, res) => {

//, withAuth add
    try {
        const ticketData = await Ticket.findByPk(req.params.id, {
            include: [{ model: User, as: "client" }, { model: User, as: "tech" }]
        });


        if (!ticketData) {
            return res.status(404).json({
                message: 'No ticket found by that id'
            })
        }

        const ticket = ticketData.get({ plain: true })


        if (ticket.client.id === req.session.user_id) {
            res.render('ticket', {
                ...ticket,
                loggedIn: req.session.loggedIn,
                title: ticket.subject,
                layout: "main",
                userType: "client"
            })
        }

        if (ticket.tech.id === req.session.user_id) {

            res.render('ticket', {
                ...ticket,
                loggedIn: req.session.loggedIn,
                title: ticket.subject,
                layout: "main",
                userType: "tech"
            })
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
    // be sure to include its associated tag data
});

module.exports = app;



//  If the user is not logged in, they will be automatically redirected away from this view to the Login page instead though the withAuth middleware.

// If the user is signed in as a client:

//  We will need to query to the Ticket model where clientId matches the user.userId of the signed in user from the session object, and include User data.
//  Only tickets where their user id is present on the 'clientId' field will be included.
// If the user is signed in as a tech:

//  We will need to query to the Ticket model and include User data.
//  Tickets where their user id is present on the 'techId' field will be included, as well as any tickets which have the 'status' of 'Open'.
//  If the status parameter is applied to the request, filter the tickets to only those whose status value match the request.
//  All tickets should include client and tech firstName lastName id and role from associated Users.
//  Only tickets which have not been archived should be included in these results. 
//  We will need to serialize the data before the view renders.
// This view should receive the required values based on context, but also

// loggedIn: BOOLEAN
// title: STRING
// layout: STRING
// userType: STRING




