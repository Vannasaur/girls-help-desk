module.exports = {
    formatTimestamp: (date) => {
        let timeStamp = new Date(date);
        let hour = timeStamp.getHours();
        let minutes = timeStamp.getMinutes();
        let meridiem = hours >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12
        return `${hour}:${minutes} ${meridiem}`
    },

    withAuth: (req, res, next) => {
        console.log("HERE")
        if (!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            next();
        }
    },

        format_date: (date) => {
            // Format date as  Mo DD, YYYY hh:mm A format.
            let timeStamp = new Date(date);
            let monthData = timeStamp.getMonth();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let month = months[monthData];
            let day = timeStamp.getDate();
            let year = timeStamp.getFullYear();

        const time = formatTimestamp(timeStamp)


//On each chat log in the ticket
//this goes in ticket.handlebars {{ determineShowHide log.isHidden }}
//NEED TO STYLE IN CSS
    determineShowHide: (value) => {
        return value === true ? "hidden" : "shown";
    },

// {{helperFuncName argument1 argument2}}
//this goes in ticket.handlebars {{determineAlignment {isHidden" false, user_id: 1, type: "message"} {id: 1} }}
//the handlebars does the loop - for each currentUser iterate over the log
//NEED TO STYLE IN CSS
    determineAlignment: (log, currentUser) => {
        let log = log.id
        let currentUser = currentUser.id

        if (log.type === "Created") {
            return "center-align";
        }

        if (log.type === "Modified") {
            return "center-align";
        }

        if (currentUser === log.userId) {
            return "right-align";
        }

        else {
            return "left-align";
        }
    }

    findDiff: (newValue, oldValue, activeUser) => {
        const diff = [];
        for (const key in newValue) {
            if (!oldValue.hasOwnProperty(key)) {
                diff.push(`${key} was added by ${activeUser}`);
            } else if (newValue[key] !== oldValue[key]) {
                diff.push(`${key} was changed from ${oldValue[key]} to ${newValue[key]} by ${activeUser}`);
            }
        }
        return diff;
    }
};
