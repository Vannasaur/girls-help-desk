module.exports = {
    formatTimestamp: (date) => {
        return date.toLocaleTimeString();
    },
    withAuth: (req, res, next) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            next();
        }
    },

};


