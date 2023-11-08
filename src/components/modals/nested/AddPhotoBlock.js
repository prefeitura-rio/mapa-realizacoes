import { Button, makeStyles, Typography } from "@material-ui/core";
import PhotoSection from "../review/PhotoSection";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useRef, useState } from "react";
import { getPreviews } from "../../../utils/previews";

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
        <PhotoSection
          photoFiles={photoFiles}
          setPhotoFiles={setPhotoFiles}
          handleAddPhoto={onAddPhotoClick}
          fullHeight
        />
      ) : (
        <Button
          variant="outlined"
          color="primary"
          className={classes.wideButton}
          onClick={onAddPhotoClick}
        >
          <AddAPhotoIcon  className={classes.bottonIcon} />
         <span style={{color:"#007E7D", fontSize:"16px"}}> Adicionar uma foto </span>
        </Button>
      )}

      <input
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={addPhotoHandler}
      />
      <Typography
        variant="h2"
        color="textSecondary"
        className={classes.underButtonText}
      >
       Contribua com fotos desta realização. Esteja ciente que a sua postagem aparecerá publicamente para todos os usuários.
      </Typography>
    </div>
  );
};

export default AddPhotoBlock;
