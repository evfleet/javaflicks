export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    }
  });

  return Review;
};