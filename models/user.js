import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 20],
            msg: "Your name must be at least 2 characters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "There is an account associated with this email",
        },
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "You must insert a valid email" },
        },
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          len: {
            args: [6, 30],
            msg: "your password must be at least 6 characters long",
          },
        },
      },
      password_hash: DataTypes.STRING,
    },
    {
      tableName: "users"
    }
  );

  User.associate = function (models) {
    User.hasMany(models.task, {
      as: "tasks"
    });
  };

  User.beforeCreate(function (user, options) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          user.password_hash = hash;
          resolve();
        }
      });
    });
  });

  return User;
};
