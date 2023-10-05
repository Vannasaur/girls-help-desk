// import models
const Log = require('./Log');
const Ticket = require('./Ticket');
const User = require('./User');

// User hasMany Ticket with foreignKey of clientId
User.hasMany(Ticket, {
    foreignKey: "clientId",
    as: "client",
    allowNull: false,
    onDelete: "CASCADE"
});

// User hasMany Ticket with foreignKey of techId
User.hasMany(Ticket, {
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "CASCADE"
});

// Ticket belongsTo User with foreignKey of clientId
Ticket.belongsTo(User, {
    foreignKey: "clientId",
    as: "client",
    allowNull: false,
    onDelete: "SET NULL"
});

// Ticket belongsTo User with foreignKey of techId
Ticket.belongsTo(User, {
    foreignKey: "techId",
    as: "tech",
    allowNull: false,
    onDelete: "SET NULL"
});

// User hasMany Log with foreignKey of userId
User.hasMany(Log, {
    foreignKey: "userId",
    allowNull: false,
    onDelete: "CASCADE"
});


// Log belongsTo User with foreignKey of userId
Log.belongsTo(User, {
    foreignKey: "userId",
    allowNull: false,
    onDelete: "SET NULL"
});


// Ticket hasMany Log with foreignKey of ticketId
Ticket.hasMany(Log, {
    foreignKey: "ticketId",
    allowNull: false,
    onDelete: "CASCADE"
});


// Log belongsTo Ticket with foreignKey of ticketId
Log.belongsTo(Ticket, {
    foreignKey: "ticketId",
    allowNull: false,
    onDelete: "SET NULL"
});

module.exports = {
    Log,
    Ticket,
    User,
};