'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn("users", "roles", {
      type: Sequelize.ENUM,
      values: ['user', 'admin']
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "roles")
  },
};
