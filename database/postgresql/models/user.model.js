module.exports = (sequelize, DataTypes) => {
  const name = "User";
  const model = sequelize.define(
    name,
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,
      },
    },
    {
      // Other model options go here
    }
  );

  model.associate = function (models) {

    model.hasMany(models.Message, {
      foreignKey: "recipientId",
      as: "recievedMessages",
      onDelete: "CASCADE",
    });

    model.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sentMessages",
      onDelete: "CASCADE",
    });

  };


  return model;
};
