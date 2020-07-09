export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "title cannot be empty" },
          notNull: { args: true, msg: "title cannot be null" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "description cannot be empty" },
          notNull: { args: true, msg: "description cannot be null" },
        },
      },

      progress:{
        type: DataTypes.ENUM,
        allowNull:false,
        values: ["todo", "working", "done"],
        defaultValue: "todo"
      },

      dashboardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "dashboardId cannot be empty" },
          notNull: { args: true, msg: "dashboardId cannot be null" },
        }
      }

      // categoryId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   validate: {
      //     notEmpty: { args: true, msg: "Category cannot be empty" }
      //   },
      // },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: { args: true, msg: "userId cannot be empty" },
      //     notNull: { args: true, msg: "userId cannot be null" },
      //   },
      //},
    },
    {
      tableName: "tasks",
    }
  );
  Task.associate = function (models) {

    Task.belongsTo(models.dashboard, {
      as: "dashboard",
      foreignKey: "dashboardId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })

    // Task.belongsTo(models.user, {
    //   as: "user",
    //   foreignKey: "userId",
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE"
    // });

    // Task.belongsTo(models.category, {
    //   as: "category",
    //   foreignKey: "categoryId",
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL"
    // });
  };
  return Task;
};
