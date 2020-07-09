'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dashboards', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },

      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      categoryId:{
        type:Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: "categories",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate: "CASCADE"
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dashboards');
  }
};