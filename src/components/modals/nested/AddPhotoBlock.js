import { Button, makeStyles, Typography } from "@material-ui/core";
import PhotoSection from "../review/PhotoSection";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useRef, useState } from "react";
import { getPreviews } from "../../../utils/previews";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  root: {},
  wideButton: {
    marginBottom: "10px",
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    borderColor: theme.palette.grey[400],
  },
  bottonIcon: {
    marginRight: "8px",
    marginBottom: "4px",
    color:"#007E7D"
  },
  underButtonText: {
    fontStyle: "italic",
  },
  esteja_ciente: {
    fontStyle: "italic",
    paddingTop:"1px",
    fontSize:"13px",fontWeight:"bold"
  },
}));

const AddPhotoBlock = ({ photoFiles, setPhotoFiles }) => {
  const classes = useStyles();

  const inputFileRef = useRef(null);

  const onAddPhotoClick = () => {
    inputFileRef.current.click();
  };

  async function addPhotoHandler(e) {
    var newFiles = await getPreviews(Array.from(e.target.files));
    if (photoFiles.length) {
      setPhotoFiles(photoFiles.concat(newFiles));
    } else {
      setPhotoFiles(newFiles);
    }
  }

  return (
    <div>
      {photoFiles.length ? (
        <>
        <PhotoSection
          photoFiles={photoFiles}
          setPhotoFiles={setPhotoFiles}
          handleAddPhoto={onAddPhotoClick}
          fullHeight
        />
        <Typography
        color="textSecondary"
        className={classes.esteja_ciente}
      >
     <ErrorOutlineIcon sx={{ fontSize: 20, color: '#007E7D'}} style={{verticalAlign: "middle"}}></ErrorOutlineIcon>Esteja ciente que a primeira foto escolhida será usada como foto de capa da realização. 
      </Typography>
      </>
      ) : (
        <>
        <Button
          variant="outlined"
          color="primary"
          className={classes.wideButton}
          onClick={onAddPhotoClick}
        >
          <AddAPhotoIcon  className={classes.bottonIcon} />
         <span style={{color:"#007E7D", fontSize:"16px"}}> Adicionar uma foto </span>
        </Button>
         <Typography
         variant="h2"
         color="textSecondary"
         className={classes.underButtonText}
       >
        Contribua com fotos desta realização. Esteja ciente que a sua postagem aparecerá publicamente para todos os usuários.
       </Typography>
       </>
      )}

      <input
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={addPhotoHandler}
      />
     
    </div>
  );
};

export default AddPhotoBlock;
