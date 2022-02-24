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
  }
  Profile.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
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