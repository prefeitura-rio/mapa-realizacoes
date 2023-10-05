import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
  Button,
  DialogContent,
  Divider,
  Link,
  TextField,
} from "@material-ui/core";
import Temas from './Temas';
import CloseIcon from "@material-ui/icons/Close";
import StoreIcon from "@material-ui/icons/Store";
import CategoryIcon from "@material-ui/icons/Category";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import EditItem from "./EditItem";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import AddPhotoBlock from "../nested/AddPhotoBlock";
import { editarRealizacao } from "../../../firebase";
import clsx from "clsx";
import MySchedule from "./MySchedule";
import { getTileImage } from "../../../utils/getTileImage";

const useStyles = makeStyles((theme) => ({
  root: {},
  dialog: {
    maxWidth: "764px",
    height: "626px",
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "4px",
    color: theme.palette.grey[500],
  },
  actions: {
    padding: "20px 20px",
  },
  dialogContent: {
    padding: 0,
  },
  contentTitle: {
    padding: "14px 54px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "Google Sans, sans-serif",
  },
  centerButton: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "54px",
    width: "calc(100% - 74px)",
    marginTop: "14px",
    marginBottom: "4px",
    paddingTop: "30px",
    paddingBottom: "30px",
    backgroundImage: (props) => `url(${props.mapFragment})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#0000008a",
    backgroundBlendMode: "darken",
  },
  bottomDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "54px",
    marginRight: "20px",
  },
  outlinedWhite: {
    color: "white",
    backgroundColor: "rgba(255,255,255,0)",
    borderColor: "white",
  },
  underButtonText2: {
    alignSelf: "start",
    marginTop: "20px",
  },
  actionButton: {
    margin: "0 4px",
    padding: "6px 24px",
  },
  scheduleDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  textFieldHours: {
    fontSize: "0.9rem",
    lineHeight: "1.3rem",
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.45,
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    },
  },
}));

const EditInfoModal = ({
  content,
  contentSnapshot,
  setOpenEditInfo,
  setOpenCompleteEditInfo,
  setContent,
  photoFiles,
  setPhotoFiles,
  loadAllPoints,
  setLocationModal,
  profile
}) => {
  const mapFragment = getTileImage(content.coords);

  const classes = useStyles({ mapFragment });

  const onClose = () => {
    setContent(JSON.parse(JSON.stringify(contentSnapshot)));
    setOpenEditInfo(false);
  };

  const dialogRef = useCallback((node) => {
    if (node !== null) {
      node.addEventListener("scroll", handleScroll);
    }
  }, []);

  async function onPostClick() {
    setDisabled(true);
    var newContent = JSON.parse(JSON.stringify(content));
    for (var field of canceledFields) {
      newContent[field] = "No data yet";
    }
    setContent(newContent);

    const data = {
      content: newContent,
      photos: photoFiles,
      profile,
      contentSnapshot: contentSnapshot
    };
    await editarRealizacao(data);

    setOpenEditInfo(false);
    setDisabled(false);
    setOpenCompleteEditInfo(true);
    setCanceledFields([]);
    setPhotoFiles([]);
    loadAllPoints();
  }

  const onCancel = () => {
    setOpenEditInfo(false);
    setContent(JSON.parse(JSON.stringify(contentSnapshot)));
  };

  const [shadow, setShadow] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };


  const onUpdateLocation = () => {
    setLocationModal(true);
  };

  const onEnderecoChange = (value) => {
    setContent({ ...content, endereco: value });
  };

  // --------------- INICIO ------------------
  const onTituloChange = (value) => {
    setContent({ ...content, titulo: value });
  };
  const onDescricaoChange = (value) => {
    setContent({ ...content, descricao: value });
  };
  const onStatusChange = (value) => {
    setContent({ ...content, status: value });
  };
  const onProgramaChange = (value) => {
    setContent({ ...content, programa: value });
  };
  const onTemaChange = (value) => {
    setContent({ ...content, tema: value });
  };
  const onOrgaoChange = (value) => {
    setContent({ ...content, orgao: value });
  };
  const onBairroChange = (value) => {
    setContent({ ...content, bairro: value });
  };
  const onSubprefeituraChange = (value) => {
    setContent({ ...content, subprefeitura: value });
  };
  const onTotalInvestidoChange = (value) => {
    setContent({ ...content, totalInvestido: value });
  };
  const onCariocasAtendidosChange = (value) => {
    setContent({ ...content, cariocasAtendidos: value });
  };
  const onDataInicioChange = (value) => {
    setContent({ ...content, dataInicio: value });
  };
  const onDataFimChange = (value) => {
    setContent({ ...content, dataFim: value });
  };

  //------------------FIM ----------------------
  const [canceledFields, setCanceledFields] = useState([]);



  const [disabled, setDisabled] = useState(false);

  // TODO remove event listener

  return (
    <>
      <DialogTitle
        className={
          disabled
            ? clsx(classes.dialogTitle, classes.disabled)
            : classes.dialogTitle
        }
        style={{
          boxShadow: shadow
            ? "0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
            : "none",
        }}
        onClose={onClose}
      >
        <div className={classes.title}>
          <Typography variant="h3" component="span">
          Inclusão de Nova Realização
          </Typography>
          <Typography variant="body1" color="textSecondary" component="span">
            {content.name}
          </Typography>
        </div>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        classes={{ root: classes.dialogContent }}
        ref={dialogRef}
        className={disabled ? classes.disabled : ""}
      >
        <Typography className={classes.contentTitle} color="textSecondary">
          Por favor, Forneça Detalhes da Realização
        </Typography>
        <Divider />
        <EditItem
          title="Título da Realização"
          IconComponent={StoreIcon}
          value={content.titulo}
          onChange={onTituloChange}
          
        />
        <EditItem
          title="Descrição"
          IconComponent={StoreIcon}
          value={content.descricao}
          onChange={onDescricaoChange}
        />

        <EditItem
          title="Status"
          IconComponent={StoreIcon}
          value={content.status}
          onChange={onStatusChange}
          isAutocomplete={true} 
        />
       
        <EditItem
          title="Programa"
          IconComponent={StoreIcon}
          value={content.programa}
          onChange={onProgramaChange}
          isAutocomplete={true} 
        />

       <EditItem
          title="Tema"
          IconComponent={StoreIcon}
          value={content.tema}
          onChange={onTemaChange}
          isAutocomplete={true} 
        />
                
        <EditItem
          title="Órgão"
          IconComponent={StoreIcon}
          value={content.orgao}
          onChange={onOrgaoChange}
          isAutocomplete={true} 
        />
        {/* <EditItem
          title="Bairro"
          IconComponent={StoreIcon}
          value={content.bairro}
          onChange={onBairroChange}
        /> */}
        {/* <EditItem
          title="Subprefeitura"
          IconComponent={StoreIcon}
          value={content.subprefeitura}
          onChange={onSubprefeituraChange}
        /> */}
        <EditItem
          title="Total Investido"
          IconComponent={StoreIcon}
          value={content.totalInvestido}
          onChange={onTotalInvestidoChange}
        />
        <EditItem
          title="Cariocas Atendidos"
          IconComponent={StoreIcon}
          value={content.cariocasAtendidos}
          onChange={onCariocasAtendidosChange}
        />
        <EditItem
          title="Data Início"
          IconComponent={StoreIcon}
          value={content.dataInicio}
          onChange={onDataInicioChange}
        />
        <EditItem
          title="Data Fim"
          IconComponent={StoreIcon}
          value={content.dataFim}
          onChange={onDataFimChange}
        />
        <EditItem
          title="Localização"
          IconComponent={LocationOnIcon}
          value={content.endereco}
          onChange={onEnderecoChange}
        />
        <div className={classes.centerButton}>
          <Button
            variant="outlined"
            classes={{ outlined: classes.outlinedWhite }}
            onClick={onUpdateLocation}
          >
            Atualizar Localização
          </Button>
        </div>

        <div className={classes.bottomDiv}>
          <AddPhotoBlock
            photoFiles={photoFiles}
            setPhotoFiles={setPhotoFiles}
          />
        </div>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button
          disabled={disabled}
          disableElevation
          autoFocus
          onClick={onCancel}
          color="primary"
          className={classes.actionButton}
        >
          Cancelar
        </Button>
        <Button
          disabled={disabled}
          variant="contained"
          disableElevation
          color="primary"
          onClick={onPostClick}
          className={classes.actionButton}
        >
          Enviar
        </Button>
      </DialogActions>
    </>
  );
};

export default EditInfoModal;
