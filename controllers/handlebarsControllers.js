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


app.get('/ticket/:id', withAuth, async (req, res) => {


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

// The Individual Ticket view will be displayed when the URL path is '/ticket/:id'.

//  This view will be rendered with the ticket view, the main layout, the title of 'Ticket Details', and whichever user type the user authenticated with.

//  If the user is not logged in, they will be automatically redirected away from this view to the Login page instead through the withAuth middleware.

//  If the user is signed in as a client, they will not be allowed to view unassociated tickets; if the ticket's clientId property doesn't match their id, they will be automatically redirected back to the home view.

//  All tickets should include client and tech firstName lastName id and role from associated Users and all Log data for this ticket.

//  If the ticket has been archived, redirect the user back to home view

//  We will need to serialize the data before the view renders.

// This view should receive the required values based on context, but also

// loggedIn: BOOLEAN
// title: STRING
// layout: STRING
// userType: STRING