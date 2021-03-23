'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      imageThumb: {
        type: Sequelize.STRING
      },
      appVersion: {
        type: Sequelize.STRING
      },
      isBan: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.INTEGER
      },
      isEmailVerified: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.BIGINT
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};