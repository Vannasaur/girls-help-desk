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

        format_date: (date) => {
            // Format date as  Mo DD, YYYY hh:mm A format.
            return date.toLocaleDateString();
        },
};


