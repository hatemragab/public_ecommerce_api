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
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique:true,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(50),
        defaultValue: "default_user_image.png"
      },
      imageThumb: {
        type: Sequelize.STRING(50),
        defaultValue: "default_user_image.png"
      },

      isEmailVerified: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.BIGINT(15),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
