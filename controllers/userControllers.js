const { User } = require('../models');

module.exports = {
    // login user
    loginUser: async function (req, res) {
        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (!userData) {
                res.status(400).json({ message: 'Incorrect email or password, please try again'});
                return;
            }
            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect email or password, please try again' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.loggedIn = true;
            });

            res.redirect('/');
            
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // logout
    logoutUser: async function (req, res) {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                // 204 means server handled request successfully but wont return anything
                res.redirect('/login')
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    }
};
