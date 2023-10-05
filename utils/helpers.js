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

        return `${month} ${day} ${year} ${time}`
    },

    findDiff: (oldValue, newValue, keyName, activeUser) => {
        if (oldValue === newValue) {
            return true;
    //Object.keys() returns an array whose elements are strings corresponding to the enumerable string-keyed property names found directly upon the object
        } else if (Object.keys(oldValue) !== Object.keys(newValue)) {
            return false;
        }
        console.log(`${keyName} was changed from ${oldValue} to ${newValue} by ${activeUser}.`)
    },

};





