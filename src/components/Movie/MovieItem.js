import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FavoriteButton } from "../UI/FavoriteButton";
import classes from "./MovieItem.module.css";

export const MovieItem = (props) => {
  const onFavoriteHandler = (event) => {
    props.onFavorite(props.movie);
  };

  const viewMovieHandler = () => {
    props.onViewMovie(props.movie);
  };

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
        cursor: "pointer",
      }}
      onClick={viewMovieHandler}
      className={classes.card}
    >
      <CardContent className={classes.glassPane}>
        <div>
          <Typography fontSize={"1rem"} sx={{ color: "white" }} component="div">
            {props?.movie?.title}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            {new Date(props?.movie?.release_date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
            })}
          </Typography>
        </div>
        <FavoriteButton
          onFavorite={onFavoriteHandler}
          isFavorite={props?.isFavorite}
        />
      </CardContent>
    </Card>
  );
};
