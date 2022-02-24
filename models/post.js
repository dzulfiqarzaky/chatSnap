'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey: 'profileId'})
      
      Post.hasMany(models.Post_Tag, {foreignKey: 'PostId'})
      Post.belongsToMany(models.Tag, {through: models.Post_Tag})
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};