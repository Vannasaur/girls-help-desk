const { Ticket, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {

    renderDashboard: async function (req, res) {
        const status = req.params.status || '';
        try {
            const ticketData = await Ticket.findAll({
                where: {
                    status: status,
                    [Op.not]: {
                        isArchived: true,
                    },

                    //  If the ticket has been archived, redirect the user back to home view

                },
                include:
                    [{ model: User, as: "client" },
                    { model: User, as: "tech" }]
            });

            //  If the user is signed in as a client, they will not be allowed to view unassociated tickets; if the ticket's clientId property doesn't match their id, they will be automatically redirected back to the home view.

            if (!ticketData) {
                return res.status(404).json({
                    message: 'No ticket found by that id'
                })
            }

            const tickets = ticketData.map(eachTicket => eachTicket.get({ plain: true }))
console.log(tickets)

            if (tickets.client.id === req.session.user_id) {
                res.render('home', {
                    tickets,
                    loggedIn: req.session.loggedIn,
                    title: "Dashboard",
                    layout: "main",
                    userType: "client"
                })
            }

            if (tickets.tech.id === req.session.user_id) {

                res.render('home', {
                    tickets,
                    loggedIn: req.session.loggedIn,
                    title: "Dashboard",
                    layout: "main",
                    userType: "tech"
                })
            }

            res.render('home', {
                tickets,
                loggedIn: true,
                title: "Dashboard",
                layout: "main",
                userType: "tech",
                client: false
            })

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }

    },

    //  If the user is not logged in, they will be automatically redirected away from this view to the Login page instead through the withAuth middleware.

    renderLogin: async function (req, res) {
        if (req.session.loggedIn) {
            return res.redirect('/')
        }
        res.render('login', {
            title: "Log In",
            layout: "login",
        });
    },

    renderLogin: async function (req, res) {
        console.info(req.session.loggedIn);
        if (req.session.loggedIn == "true") {
            //continues to redirect 
            return res.status(401).redirect('/')
        }
        res.render('login', {
            title: "Log In",
            layout: "login",
        });
    },

    renderTicket: async function (req, res) {
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

            //  We will need to serialize the data before the view renders.

            //  This view will be rendered with the ticket view, the main layout, the title of 'Ticket Details', and whichever user type the user authenticated with.

            if (ticket.client.id === req.session.user_id) {
                res.render('ticket', {
                    ...ticket,
                    loggedIn: req.session.loggedIn,
                    title: ticket.subject,
                    layout: "main",
                    userType: "client"
                })
            }

            //  All tickets should include client and tech firstName lastName id and role from associated Users and all Log data for this ticket.

            if (ticket.tech.id === req.session.user_id) {

                res.render('ticket', {
                    ...ticket,
                    loggedIn: req.session.loggedIn,
                    title: ticket.subject,
                    layout: "main",
                    userType: "tech"
                })
            }

            // This view should receive the required values based on context, but also

            // loggedIn: BOOLEAN
            // title: STRING
            // layout: STRING
            // userType: STRING

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
        // be sure to include its associated tag data
    },

}

