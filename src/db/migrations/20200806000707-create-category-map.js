'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CategoryMaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      node_id: {
        type: Sequelize.INTEGER,
      },
      lft: {
        type: Sequelize.INTEGER,
      },
      rgt: {
        type: Sequelize.INTEGER,
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CategoryMaps');
  },
};
