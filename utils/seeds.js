const sequelize = require('../config/connection');
const { User, Ticket } = require('../models');

const userData = require('./userData.json')
const ticketData = require('./ticketData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await sequelize.sync({ force: true });

    await Ticket.bulkCreate(ticketData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();








