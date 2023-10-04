// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Log extends Model {}

// Set up fields and rules for Product Model
Log.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allownull: false,
            required: true,
            references: {
                model: "user",
                key: "id"
              }
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allownull: false,
            required: true,
            references: {
                model: "ticket",
                key: "id"
              }
        },
        messsage: {
            type: DataTypes.STRING,
            allownull: false,
            required: true
        },
        type: {
            type: DataTypes.ENUM("Created", "Modified", "Message"),
            allownull: false,
            required: true,
            defaultValue: "Message"
        },
        isHidden: {
            type: DataTypes.BOOLEAN,
            allownull: false,
            required: true,
            defaultValue: false
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'log'
    }
);
module.exports = Log;

// Log
// ├── userId
// │   ├── INTEGER
// │   ├── Required
// │   ├── Foreign key which references `user`.`id`
// ├── ticketId
// │   ├── INTEGER
// │   ├── Required
// │   ├── Foreign key which references `ticket`.`id`
// ├── message
// │   ├── STRING
// │   ├── Required
// ├── type
// │   ├── STRING
// │   ├── Required
// │   ├── Default value will be "Message"
// │   ├── Must be "Created", "Modified", or "Message"
// ├── isHidden
// │   ├── BOOLEAN
// │   ├── Required
// │   ├── Default value of `false`