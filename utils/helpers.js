const format_timestamp = (date) => {
    let timeStamp = new Date(date);
    let hour = timeStamp.getHours();
    let minutes = timeStamp.getMinutes();
    let meridien = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12
    return `${hour}:${minutes} ${meridien}`
};

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

const format_date = (date) => {
    // Format date as  Mo DD, YYYY hh:mm A format.
    let timeStamp = new Date(date);
    let monthData = timeStamp.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[monthData];
    let day = timeStamp.getDate();
    let year = timeStamp.getFullYear();

    const time = format_timestamp(timeStamp)
    return `${month} ${day} ${year} ${time}`
};

//On each chat log in the ticket
//this goes in ticket.handlebars {{ determineShowHide log.isHidden }}
const determineShowHide = (value) => {
    if (value === "Open")
        return true;

    return value === true ? "notShown" : "shown";
};

// {{helperFuncName argument1 argument2}}
//this goes in ticket.handlebars {{determineAlignment {isHidden" false, user_id: 1, type: "message"} {id: 1} }}
//the handlebars does the loop - for each currentUser iterate over the log
const determineAlignment = (log, user) => {

    if (log.type === "Created") {
        return "center-align";
    }

    if (log.type === "Modified") {
        return "center-align";
    }

    if (user === log.userId) {
        return "right-align";
    }

    else {
        return "left-align";
    }
};

const findDiff = (newData, oldData, activeUser) => {
    const diff = [];
    for (const key in newData) {
        if (!oldData.hasOwnProperty(key)) {
            diff.push(`${key} was added by ${activeUser}`);
        } else if (newData[key] !== oldData[key]) {
            diff.push(`${key} was changed from ${oldData[key]} to ${newData[key]} by ${activeUser}`);
        }
    }
    return diff;
};

// The status argument should be the ticket.status value.
//  The id argument should be the ticket.id value.
const showClaimButton = (status, id) => {
    if (status === "Open") {
        return `<button class="claim-ticket-btn" data-id=${id}>Claim</button>`
    }
    return "";
};

const showLinkButton = (id) => {
    return `<a class="btn btn-primary black white-text btn-claimed-link" type="click" href="/ticket/${id}">View Ticket</a>`
};

module.exports = { withAuth, format_date, format_timestamp, determineShowHide, determineAlignment, findDiff, showClaimButton, showLinkButton };
