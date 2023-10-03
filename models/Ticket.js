const { Model, Log, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// define the class for our model
class Ticket extends Model { }
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
                        message: "Ticket number "+ ticket.id + " created."
                    }
                    )
                },
                afterUpdate: async (ticket, options) => {
                    if (ticket.status === 'Resolved' && ticket.isArchived !== true) {
                        await sequelize.models.ticket.update(
                            { isArchived: true },
                            { where: { id: ticket.id }}
                        );
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