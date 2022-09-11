import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useState } from "react";
import classes from "./FavoriteButton.module.css";

export const FavoriteButton = (props) => {
  const [isActive, setIsActive] = useState(false);

  const onFavoriteHandler = (event) => {
    event.stopPropagation();
    setIsActive((current) => !current);
    props.onFavorite();
  };

  return (
    <div className={classes.iconContainer}>
      {props.isFavorite ? (
        <StarIcon
          className={`${isActive ? classes.animateIcon : ""} ${classes.icon}`}
          onMouseDown={onFavoriteHandler}
          sx={{ fontSize: 35 }}
        />
      ) : (
        <StarOutlineIcon
          className={`${isActive ? classes.animateIcon : ""} ${classes.icon}`}
          onMouseDown={onFavoriteHandler}
        />
      )}
    </div>
  );
};
