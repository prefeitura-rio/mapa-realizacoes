import { Button, DialogActions } from "@material-ui/core";
import { DialogContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  completeBlock: {
    backgroundColor: "#1a73e8",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  completeImage: {
    height: "84px",
    objectFit: "contain",
    padding: "40px",
  },
  buttons: {
    margin: "4px 12px",
    padding: "6px 24px",
  },
}));

const SuccessContent = ({ onClose }) => {
  const classes = useStyles();
  return (
    <>
      <DialogContent className={classes.completeBlock}>
        <img
          src="https://maps.gstatic.com/places-api/reviews-widget/images/img_done_check_2x_1.png"
          alt=""
          className={classes.completeImage}
        />
        <Typography variant="h1">Obrigado por criar um comentário!</Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          disableElevation
          autoFocus
          color="primary"
          className={classes.buttons}
          onClick={onClose}
        >
          Fechar janela
        </Button>
      </DialogActions>
    </>
  );
};

export default SuccessContent;
