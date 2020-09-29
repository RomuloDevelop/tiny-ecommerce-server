'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Clients', {
      fields: ['name'],
      type: 'UNIQUE',
      name: 'unique_client_name',
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Clients', 'unique_client_name');
  },
};
