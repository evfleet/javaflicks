export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    imdbId: {
      type: DataTypes.STRING
    },
    tmdbId: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    tagline: {
      type: DataTypes.STRING
    },
    release: {
      type: DataTypes.STRING
    },
    runtime: {
      type: DataTypes.INTEGER
    },
    overview: {
      type: DataTypes.STRING
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    posterPath: {
      type: DataTypes.STRING
    },
    backdropPath: {
      type: DataTypes.STRING
    }
  });

  Movie.associate = (models) => {
    Movie.belongsToMany(models.User, { through: 'UserMovie' });
  };

  return Movie;
};