const { Ticket, User } = require('../models');

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
                    userType: "client",
                    client: req.session.userType === client
                })
            }
            if (tickets.tech.id === req.session.user_id) {
                res.render('home', {
                    ...tickets,
                    loggedIn: req.session.loggedIn,
                    title: "Dashboard",
                    layout: "main",
                    userType: "tech",
                    client: req.session.userType === client
                })
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
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
    },
};



