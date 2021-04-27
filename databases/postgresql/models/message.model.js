module.exports = (sequelize, DataTypes) => {
  const name = "Message";
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
      messageId: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      recipientId: {
        type: DataTypes.BIGINT,
      },
      senderId: {
        type: DataTypes.BIGINT,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
    },
    {
      // Other model options go here
      instanceMethods: {},
    }
  );

  return model;
};
