const sequelize = require('../config/connection');
const { User } = require('../models');

// @@TODO userData.json will be in this same folder
const userData = require('./userData.json')

// OPTIONAL @@ TODO create sample ticketData.json in this same folder
const ticketData = require('./ticketData.json');

// seed sample User data
const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();

// OPTIONAL seed sample Ticket data





// seed sample Log data

