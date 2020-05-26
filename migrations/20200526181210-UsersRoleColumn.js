"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM,
      values: ['user', 'admin']
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users","role")
  },
};
