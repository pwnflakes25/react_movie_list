import { MovieItem } from "./MovieItem";
import Grid from "@mui/material/Grid";

export const MovieList = (props) => {
  const onFavoriteHandler = (movie) => {
    props.onFavoriteMovie(movie);
  };

  const favoriteMoviesIds = props.favoriteMovies.map(movie => movie._id);

  return (
    <Grid
      sx={{ flexGrow: 1 }}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {props.movies.map((movie) => (
        <Grid key={movie._id} item xs={6} md={3}>
          <MovieItem
            onFavorite={onFavoriteHandler}
            isFavorite={favoriteMoviesIds.includes(movie._id)}
            movie={movie}
          />
        </Grid>
      ))}
    </Grid>
  );
};
