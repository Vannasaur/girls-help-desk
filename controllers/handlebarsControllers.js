const { Ticket, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {

    renderDashboard: async (req, res) => {
        try {
            const status = req.params.status || '';
            console.log(status)
            const where = {};
            if (status) {
                where.status = status;
            };
            if (req.session.role === 'client') {
                where.clientId = req.session.user_id
            } else {
                //where.techId = req.session.user_id;
                if (status !== '') {
                    where.techId = req.session.user_id;
                } else {
                    where[Op.or] = [
                        { techId: req.session.user_id },
                        { techId: null }
                    ]
                }
            }
            // IF for req.session.role === tech
            console.log(where);
            const ticketData = await Ticket.findAll({
                where: where,
                include: [
                    {
                        model: User,
                        as: 'client',
                        attributes: ['firstName', 'lastName', 'id', 'role'],
                    },
                    {
                        model: User,
                        as: 'tech',
                        attributes: ['firstName', 'lastName', 'id', 'role'],
                    },
                ]
            })
            console.log(ticketData);
            let tickets = ticketData.map((tickets) => tickets.get({ plain: true }));
            console.log(tickets)
            const isTech = (req.session.role !== 'client') ? true : false;
            console.log(isTech);
            //notClaimed needed for handlebars to know that if the techId on the ticket is null, then the claim button should appear
            const testTicket = (tickets) => {
                for (const ticket of tickets) {
                    if (ticket.techId !== null) {
                        ticket.notClaimed = false
                    } else {
                        ticket.notClaimed = true
                    }
                }
                return tickets
            }

            tickets = await testTicket(tickets);
            console.log(tickets);
            res.render('home',
                {
                    tickets: [...tickets.map(ticket => ({ ...ticket, isTech }))],
                    isTech,
                    loggedIn: true, // req.session.loggedIn
                    title: 'Dashboard',
                    layout: 'main',
                    userType: req.session.role,
                    firstName: req.session.firstName
                }
            )
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }

    },

    //  If the user is not logged in, they will be automatically redirected away from this view to the Login page instead through the withAuth middleware.

    renderLogin: async function (req, res) {
        if (req.session.loggedIn) {
            return res.status(401).redirect('/')
        }
        res.render('login', {
            title: "Log In",
            layout: "login",
        });
    },

    // renderLogin: async function (req, res) {
    //     console.info(req.session.loggedIn);
    //     if (req.session.loggedIn == "true") {
    //         //continues to redirect 
    //         return res.status(401).redirect('/')
    //     }
    //     res.render('login', {
    //         title: "Log In",
    //         layout: "login",
    //     });
    // },

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

            if (ticket.tech.id === req.session.user_id) {
                res.render('ticket', {
                    ...ticket,
                    loggedIn: req.session.loggedIn,
                    title: ticket.subject,
                    layout: "main",
                    userType: "tech"
                })
            }

            //  All tickets should include client and tech firstName lastName id and role from associated Users and all Log data for this ticket.


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
    }
}
