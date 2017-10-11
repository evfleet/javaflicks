export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING
    },
    directions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    });

    Recipe.belongsToMany(models.User, {
      through: 'UserRecipe'
    });
  };

  return Recipe;
};