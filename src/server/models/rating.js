export default (sequelize, DataTypes) => {
  const Rating = sequelize.definfe('Rating', {
    value: {
      type: DataTypes.INTEGER
    }
  });

  return Rating;
};