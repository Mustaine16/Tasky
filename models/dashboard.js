'use strict';
module.exports = (sequelize, DataTypes) => {

  const Dashboard = sequelize.define('dashboard', {

    name: DataTypes.STRING,

    done: {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "userId cannot be empty" },
        notNull: { args: true, msg: "userId cannot be null" },
      }
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: "dashboards"
  });

  Dashboard.associate = function (models) {

    Dashboard.hasMany(models.task, {
      as: "tasks"
    })

    Dashboard.belongsTo(models.user, {
      as: "user",
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })

    Dashboard.belongsTo(models.category,{
      as: "category", 
    })

  };
  return Dashboard;
};