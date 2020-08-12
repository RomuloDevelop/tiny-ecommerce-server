'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('CategoryMaps', {
      fields: ['client_id', 'node_id'],
      type: 'UNIQUE',
      name: 'unique_client_node',
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CategoryMaps', 'unique_client_node');
  },
};
