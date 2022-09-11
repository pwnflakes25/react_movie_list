import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FavoriteButton } from "../UI/FavoriteButton";
import classes from "./MovieItem.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const MovieItem = (props) => {
  const onFavoriteHandler = (event) => {
    props.onFavorite(props.movie);
  };

  const viewMovieHandler = () => {
    props.onViewMovie(props.movie);
  };

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1rem",
    "@media (max-width:1024px)": {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  };

  const posterPath = props?.movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
    : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";

  return (
    <Card
      sx={{
        borderRadius: 5,
        background: `url(${posterPath})`,
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
          <ThemeProvider theme={theme}>
            <Typography variant="h3" sx={{ color: "white" }}>
              {props?.movie?.title}
            </Typography>
          </ThemeProvider>
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
