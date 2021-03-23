'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    imageThumb: DataTypes.STRING,
    appVersion: DataTypes.STRING,
    isBan: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    isEmailVerified: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'user',
    timestamps:false,
    defaultScope: {
      attributes: {
        exclude: [
          "password"
        ]
      }
    },
    scopes: {
      withPassword: {
        attributes: {
          include: [
            "password"
          ]
        }
      }
    }
  });
  return user;
};