'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get age(){
      return new Date().getFullYear() - new Date(this.born).getFullYear()
    }

    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey: 'userId'})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'name cannot be empty'
        }
      }
    },
    born: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'date cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'address cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'address cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};