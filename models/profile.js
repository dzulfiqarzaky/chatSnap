'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {foreignKey: 'userId'})
      Profile.hasMany(models.Post, {foreignKey: 'profileId'})
    }

    static sum(){
      return Profile.findAll({
        where: {role:'user'},
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('role')), 'count']
        ]
      })
        .then((result) => {
          return `Jumlah seluruh user adalah ${result[0].dataValues.count}`
        })
    }
  }
  Profile.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'password cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'email cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'role cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'role cannot be empty'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance, options){
        const salt = bcrypt.genSaltSync(7)
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};