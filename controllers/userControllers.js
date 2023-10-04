// login users & redirect users if logged in

// The Login view will be displayed when the URL path is '/login'.
// This view will be rendered with the login view (on the login.handlebars), with the title of 'Log In' and no user type defined.
//If the user is already logged in, they will be automatically redirected away from this view to the Dashboard page instead.
// No Sequelize queries will need to run in order to render this view, however this view will be connected to the login.js script, which will post a request to authenticate using Sequelize to our server upon form submission.
// No userType will be added to this particular view.
// This view should receive the required values based on context, but also
// title: STRING
// layout: STRING

const { User } = require('../models')

module.exports = {

    //log in a user
    loginUser: async function (req, res) {
        try {
            const dbUserData = await User.findOne({ //find user with email from database
                where: {
                    email: req.body.email,
                },
            });

            if (!dbUserData) {
                return res.status(400).res.json({ message: 'Incorrect email or password. Please try again!' });
            }

            const validPassword = await dbUserData.checkPassword(req.body.password); //defined in User Model

            if (!validPassword) {
                return res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            }

            req.session.save(() => { //if login info is correct, save session
                req.session.loggedIn = true; //user is logged in
                return res.status(200).json(dbUserData);
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    //If the user is already logged in, they will be automatically redirected away from this view to the Dashboard page instead.
    //The Dashboard view will be displayed when the URL path is '/:status?
    redirectUserLoggedIn: async function (req, res) {
        try {
            if (req.session.loggedIn) {
                router.get('/:status?', (req, res) => {
                    return res.redirect('/');
                })
            }
        } catch (err) {
            return res.status(404).json(err);
        }
    }
}