'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category, {
        foreignKey:  'category_id',
        as: 'categories',
      });
      this.belongsTo(models.Category, {
        foreignKey:  'category_id',
        as: 'category',
      });
      this.hasMany(models.Item, {
        foreignKey: {
          name: 'category_id',
        },
        onDelete: 'CASCADE',
      });
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};