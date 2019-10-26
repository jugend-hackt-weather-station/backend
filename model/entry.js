const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports.create = sequelize => {
  class Entry extends Sequelize.Model {}
  Entry.init(
    {
      longitude: {
        type: DataTypes.DECIMAL(9, 6)
      },
      latitude: {
        type: DataTypes.DECIMAL(9, 6)
      },
      temperature: {
        type: DataTypes.DECIMAL(6, 2)
      }
    },
    {
      sequelize,
      tableName: "entry",
      freezeTableName: true
    }
  );
  return Entry;
};
