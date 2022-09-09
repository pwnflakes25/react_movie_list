import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import styles from "./MovieDetail.module.css";
import { styled } from "@mui/material/styles";
import { style } from "@mui/system";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

export const MovieDetail = (props) => {
  return (
    <div>
      <CustomDialog
        open={props.openState}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "#282c34",
            maxWidth: "unset",
            color: "white",
            borderRadius: "20px",
          },
        }}
      >
        <DialogContent>
          <div
            className={styles.moviePoster}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500/${props?.movie?.poster_path}')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className={styles.movieDetail}>
            <div className={styles.movieHeader}>
              <h2>{props?.movie?.title} | </h2>
              <h2>{new Date(props?.movie?.release_date).getFullYear()} </h2>
            </div>
            <div className={styles.movieContent}>
              <p>{props?.movie?.overview}</p>
            </div>

            <p>{props.title}</p>
          </div>
        </DialogContent>
      </CustomDialog>
    </div>
  );
};
