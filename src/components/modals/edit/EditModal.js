import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    color: '#007E7D',
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "4px",
    color: theme.palette.grey[500],
  },
  list: {
    paddingTop: 0,
    paddingBottom: "16px",
  },
  dialog: {
    width: "400px",
  },
  dialogContent: {
    padding: 0,
  },
  gutters: {
    paddingLeft: "24px",
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
  },
}));

const EditModal = ({ setOpenEdit, openEdit, setOpenEditInfo }) => {
  const classes = useStyles();

  const onClose = () => {
    setOpenEdit(false);
  };

  const onEditInfoClick = () => {
    setOpenEdit(false);
    setOpenEditInfo(true);
  };

  return (
    <div className={classes.root}>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
        PaperProps={{ className: classes.dialog }}
      >
        <DialogTitle className={classes.dialogTitle} onClose={onClose}>
          <Typography variant="h3" component="div">
            Editar informações
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <List className={classes.list}>
            <Divider component="li" />
            <ListItem
              button
              classes={{ gutters: classes.gutters }}
              onClick={onEditInfoClick}
            >
              <ListItemIcon>
                <EditIcon className={classes.editIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Alterar título ou outros detalhes"
                primaryTypographyProps={{ variant: "subtitle2" }}
                secondaryTypographyProps={{ variant: "body2" }}
                secondary="Edite informações da realização"
              />
            </ListItem>
            <Divider component="li" />
           
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditModal;
