import { MovieItem } from "./MovieItem";
import Grid from "@mui/material/Grid";
import { Fragment, useState } from "react";
import { MovieDetail } from "./MovieDetail";
import Slide from "@mui/material/Slide";

export const MovieList = (props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentViewedMovie, setCurrentViewedMovie] = useState(null);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const onViewMovieHandler = (movie) => {
    setCurrentViewedMovie(movie);
    handleDialogClickOpen();
  };

  const onFavoriteHandler = (movie) => {
    props.onFavoriteMovie(movie);
  };

  const favoriteMoviesIds = props.favoriteMovies.map((movie) => movie.id);

  return (
    <Fragment>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {props.movies.map((movie) => (
          <Slide key={movie.id} direction="up" in={!!props.movies} mountOnEnter unmountOnExit>
            <Grid item xs={6} md={3}>
              <MovieItem
                onFavorite={onFavoriteHandler}
                isFavorite={favoriteMoviesIds.includes(movie.id)}
                movie={movie}
                onViewMovie={onViewMovieHandler}
              />
            </Grid>
          </Slide>
        ))}
      </Grid>
      <MovieDetail
        movie={currentViewedMovie}
        openState={isDialogOpen}
        handleClose={handleDialogClose}
      />
    </Fragment>
  );
};
