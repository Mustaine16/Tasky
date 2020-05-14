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
            args: [2, 30],
            msg: "Your name must have between 2 and 30 characters",
          },
          notEmpty: { args: true, msg: "name cannot be empty" },
          notNull: { args: true, msg: "name cannot be null" },
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
          notEmpty: { args: true, msg: "email cannot be empty" },
          notNull: { args: true, msg: "email cannot be null" },
        },
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          len: {
            args: [6, 30],
            msg: "your password must be at least 6 characters long",
          },

          notEmpty: { args: true, msg: "password cannot be empty" },
          notNull: { args: true, msg: "password cannot be null" },
        },
      },
      password_hash: DataTypes.STRING,
    },
    {
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.task, {
      as: "tasks",
    });
  };

  User.prototype.authenticatePassword = function (password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password_hash, function (err, valid) {
        if (err) return rej(err);

        return res(valid);
      });
    });
  };

  User.login = async function (email, password) {

    try {
      //Buscar al usuario
      const user = await User.findOne({
        where: {
          email,
        },
      });

      /* console.log(user) */

      if (!user) return null;

      const valid = await user.authenticatePassword(password);
      console.log({ valid: valid });
      
      return valid ? user : null;
    } catch (error) {
      return error;
    }
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
