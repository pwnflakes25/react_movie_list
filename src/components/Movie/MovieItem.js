import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import classes from "./MovieItem.module.css";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const MovieItem = (props) => {

  const onFavoriteHandler = () => {
    props.onFavorite(props.movie);
  }


  return (
    <Card
      sx={{
        borderRadius: 5,
        background: `url('${props.movie.image}')`,
        height: "15rem",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        cursor: 'pointer',
      }}
    >
        <CardContent className={classes.glassPane}>
          <div>
          <Typography variant="h5" component="div">
            {props.movie.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.movie.year}
          </Typography>
          </div>
          <div>
          {props.isFavorite ? <StarIcon onClick={onFavoriteHandler} /> : <StarOutlineIcon onClick={onFavoriteHandler} />}
          </div>
        </CardContent>
    </Card>
  );
};
