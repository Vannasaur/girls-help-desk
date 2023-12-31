const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt');


// The User model must include an instance method using bcrypt to verify a password is valid upon login.

// define the class for our model
class User extends Model {
  // instance methods go here
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        notContains: 'password'
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['tech', 'client']]
      },
      defaultValue: 'client'
    }

  },

  //meta table defintions
  // hooks
  {
    hooks: { // in bulkCreate => individualHooks: true
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.email = newUserData.email.toLowerCase();

        if (!newUserData.name) {
          newUserData.name = newUserData.email;
        }

        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        if (updateUserData.password) {
          updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
        }

        if (updateUserData.email) {
          updateUserData.email = updateUserData.email.toLowerCase();
        }

        return updateUserData;
      }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'user'

  }
);
module.exports = User;





// The User model must include custom hooks for beforeCreate and beforeUpdate.

//  This User model must include a beforeCreate hook to hash a password upon entry into the database.
//  The beforeCreate hook must set the email to lower case upon entry into the database.
//  This User model must include a beforeUpdate hook to hash a password upon changes to the database if the password is passed.
//  The beforeUpdate hook must set the email to lower case upon changes to the database if the email is passed.