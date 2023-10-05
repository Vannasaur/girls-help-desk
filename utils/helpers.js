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
    
    findDiff: (newValue, oldValue) => {
        let activeUser;
        if (oldValue === newValue) {
            activeUser =
            console.log(`${keyName} was changed from ${oldValue} to ${newValue} by ${activeUser}.`)
        }
    }
};


