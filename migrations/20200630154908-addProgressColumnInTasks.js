'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('tasks', 'progress', {
      type: Sequelize.ENUM,
      values: ["todo", "working", "done"]
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tasks', 'progress');
  }
};
