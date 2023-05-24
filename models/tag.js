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
      this.belongsToMany(models.Item, {
        foreignKey: {
          name: 'tag_id'
        },
        through: models.ItemTag
      });
    }
  }
  Tag.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};