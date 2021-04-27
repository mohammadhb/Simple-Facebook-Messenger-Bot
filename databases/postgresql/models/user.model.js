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
      sender_id: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      state: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
    }
  );
  return model;
};
