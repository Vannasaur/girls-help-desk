const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const helper = require('../utils/helpers');
const log = require('./Log');

const { User } = require('./index');


// define the class for our model
class Ticket extends Model {

    async logChange(firstName, oldData) { //logChange instance method, parameters include userId and oldData
        const differences = helper.findDiff(this.dataValues, oldData, firstName); //find difference between current ticket value and previous ticket values
        const now = new Date();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const year = now.getFullYear();
        const timeZone = now.toLocaleString('default', { timeZoneName: 'short' });

        const currentDate = `${timeZone}`;

        if (differences.length === 0) {
            return;
        }
        await log.create({
            type: "Modified",
            message: `${differences.length} changes were made on ${helper.format_date(currentDate)}. ${differences.join(", ")}`, //combine previous updates + new updates separated by commas

            firstName,
            ticketId: this.id,
        });
        //await log.save();
    }
}
// init the model
Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
            references: {
                model: User,
                key: 'id',
            }
        },
        techId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        status: {
            type: DataTypes.ENUM('Open', 'Pending', 'Resolved', 'Claimed'),
            allowNull: false,
            required: true,
            defaultValue: 'Open',
        },
        urgency: {
            type: DataTypes.ENUM('Low', 'Medium', 'High'),
            allowNull: false,
            required: true,
            defaultValue: 'Low',
        },
        isArchived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            required: true,
            defaultValue: false,
        }
    },
    {
        hooks: {
            afterCreate: async (ticket, options) => {
                await sequelize.models.log.create({
                    ticketId: ticket.id,
                    type: "Created",
                    userId: ticket.clientId,
                    message: "Ticket number " + ticket.id + " created."
                }
                )
            },
            afterUpdate: async (ticket, options) => {
                if (ticket.status === 'Resolved' && ticket.isArchived !== true) {
                    await sequelize.models.ticket.update(
                        { isArchived: true },
                        { where: { id: ticket.id } }
                    )
                }
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'ticket',
    }

);

module.exports = Ticket;