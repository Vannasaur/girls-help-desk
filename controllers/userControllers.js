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
                res.status(404).json({ message: 'Incorrect email or password, please try again'});
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
                req.session.role = userData.role;
                req.session.firstName = userData.firstName;

                res.status(200).json('Data has been successfully saved.')
            });

            
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // logout
    logoutUser: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Server Error during logout');
            }
            return res.redirect('/login'); // Redirect to login page
        });
    }
};
