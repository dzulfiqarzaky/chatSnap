'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.hasMany(models.Post_Tag, {references: 'TagId'})
      Tag.belongsToMany(models.Post, {through: models.Post_Tag})
    }
  }
  Tag.init({
    name: {
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
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.name = `#${instance.name}`
      }
    },
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};