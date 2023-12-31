const { Ticket, User, Log } = require('../models');
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
            if (status !== "Resolved") {
                where.isArchived = false;
            }
            if (req.session.role === 'client') {
                where.clientId = req.session.user_id
            } else {
                //where.techId = req.session.user_id;
                if (status !== '' && status !== "Open") {
                    where.techId = req.session.user_id;
                } else {
                    where[Op.or] = [
                        { techId: req.session.user_id },
                        { techId: null }
                    ]
                }
            }

            console.log(where);
            const Data = await Ticket.findAll({
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
            console.log(Data);
            let tickets = Data.map((tickets) => tickets.get({ plain: true }));
            console.log(tickets);

            //notClaimed needed for handlebars to know that if the techId on the ticket is null, then the claim button should appear
            const notClaimed = (tickets) => {
                for (const ticket of tickets) {
                    if (ticket.techId !== null) {
                        ticket.notClaimed = false
                    } else {
                        ticket.notClaimed = true
                    }
                }
                return tickets
            }

            tickets = await notClaimed(tickets);
            console.log(tickets);

            const determineTech = () => {
                if (req.session.role !== 'client') {
                    return true;
                } else {
                    return false;
                }
            }
            const isTech = determineTech();

            console.log(isTech);

            res.render('home',
                {
                    tickets: [...tickets.map(ticket => ({ ...ticket, isTech }))],
                    userid: req.session.user_id,
                    isTech,
                    loggedIn: true, // req.session.loggedIn
                    title: 'Dashboard',
                    layout: 'main',
                    userType: req.session.role,
                    firstName: req.session.firstName,
                    tech: true,
                    client: true,
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

    renderTicket: async function (req, res) {
        try {
            const ticketData = await Ticket.findByPk(req.params.id, {
                include: [
                    {
                        model: User, as: "client"
                    },
                    {
                        model: User, as: "tech"
                    },
                    {
                        model: Log,
                        include: [{ model: User, attributes: ['firstName'] }]
                    }]
            });
            // add a where here!!
            if (!ticketData) {
                return res.status(404).json({
                    message: 'No ticket found by that id'
                })
            }
            //  We will need to serialize the data before the view renders.
            const ticket = ticketData.get({ plain: true })

            if (req.session.role === 'client' && ticket.clientId !== req.session.user_id) {
                res.redirect('/');
                return;
            }

            const isTech = (req.session.role !== 'client') ? true : false;
            console.log(req.session.role);
            //  This view will be rendered with the ticket view, the main layout, the title of 'Ticket Details', and whichever user type the user authenticated with.

            const isTechLoggedIn = (req.session.loggedIn && req.session.role === "tech") ? true : false;
            console.log(isTechLoggedIn);

            res.render('ticket', {
                ...ticket,
                loggedIn: req.session.loggedIn,
                title: ticket.subject,
                layout: 'main',
                role: req.session.role,
                firstName: req.session.firstName,
                user: req.session.user_id,
                isTech,
                isTechLoggedIn
            })

            console.log(ticket);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
};
