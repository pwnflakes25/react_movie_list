import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./MovieItem.module.css";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


export const MovieItem = (props) => {

  const onFavoriteHandler = (event) => {
    event.stopPropagation();
    props.onFavorite(props.movie);
  }

  const viewMovieHandler = () => {
    props.onViewMovie(props.movie);
  }


  return (
    <Card
      sx={{
        borderRadius: 5,
        background: `url('https://image.tmdb.org/t/p/w500/${props.movie.poster_path}')`,
        height: "15rem",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        cursor: 'pointer',
      }}
      onClick={viewMovieHandler}
      className={classes.card}
    >
        <CardContent className={classes.glassPane}>
          <div>
          <Typography variant="h5" component="div">
            {props.movie.original_title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.movie.release_date}
          </Typography>
          </div>
          <div className={classes.iconContainer}>
          {props.isFavorite ? <StarIcon onMouseDown={onFavoriteHandler} sx={{fontSize: 35}} /> : <StarOutlineIcon onMouseDown={onFavoriteHandler}  sx={{fontSize: 35}}/>}
          </div>
        </CardContent>
    </Card>
  );
};
