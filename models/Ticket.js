const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define the class for our model
class Ticket extends Model {

    async logChange(userId, oldData) { //logChange instance method, parameters include userId and oldData
        const differences = await findDiff(this, oldData); //find difference between current ticket value and previous ticket values
        if (differences.length === 0) {
            return;
        }
        await log.create({
            type: "Modified",
            message: `${differences.length} changes were made on ${new Date()} by user ${userId}. ${diffs.join(", ")}`, //combine previous updates + new updates separated by commas
            userId,
            ticketId: this.id,
        });
        await log.save();
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
                model: 'user',
                key: 'id',
            }
        },
        techId: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
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
        underscored: true,
        modelName: 'ticket',
    }
);

module.exports = Ticket;