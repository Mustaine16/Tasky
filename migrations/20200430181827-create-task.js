"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable("tasks", {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 40],
          is: ["^[a-z]+$", "i"], //will only allow letters
        },
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dashboardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "dashboards",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      // categoryId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "categories",
      //     id: "id"
      //   },
      //   onDelete: "SET NULL",
      //   onUpdate: "CASCADE",
      // },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "users",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // },
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  },
};
