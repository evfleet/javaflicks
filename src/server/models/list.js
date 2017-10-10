export default (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    items: {
      type: DataTypes.JSONB
    }
  });

  return List;
};