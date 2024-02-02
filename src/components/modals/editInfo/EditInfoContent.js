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
import PlaceIcon from '@mui/icons-material/Place';
import { useCallback } from "react";
import AddPhotoBlock from "../nested/AddPhotoBlock";
import { createUpdateRealizacaoFromForm } from "../../../firebase";
import clsx from "clsx";
import MySchedule from "./MySchedule";
import { getTileImage } from "../../../utils/getTileImage";
import DatePickerFim from './DatePickerFim'; 
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
    marginLeft: "10px",
    marginRight: "50px",
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
    backgroundColor: "#007E7D",
    backgroundBlendMode: "darken",
    borderRadius: "20px",
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
    fontSize: "16px",
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
  loadAllPlaces,
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
    await createUpdateRealizacaoFromForm(data);

    setOpenEditInfo(false);
    setDisabled(false);
    setOpenCompleteEditInfo(true);
    setCanceledFields([]);
    setPhotoFiles([]);
    // loadAllPoints();
    loadAllPlaces();
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

  // --------------- INICIO ------------------
  const onTituloChange = (value) => {
    setContent({ ...content, nome: value });
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
  const onTotalInvestidoChange = (value) => {
    setContent({ ...content, investimento: value });
  };
  const onCariocasAtendidosChange = (value) => {
    setContent({ ...content, cariocas_atendidos: value });
  };
  const onDataInicioChange = (value) => {
    setContent({ ...content, data_inicio: value });
  };
  const onDataFimChange = (value) => {
    setContent({ ...content, data_fim: value });
  };

  //------------------FIM ----------------------
  const [canceledFields, setCanceledFields] = useState([]);



  const [disabled, setDisabled] = useState(false);

  // TODO remove event listener

  const habilitaBotao = () => {
    if(!(content.nome && content.descricao && content.status)){
      return true
    }
    return false
  }

  console.log("content here", content)

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
            {content.nome}
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
        <Divider />
        <EditItem
          title="Título da Realização"
          tooltip="Digite o nome principal do projeto ou ação.."
          // IconComponent={StoreIcon}
          value={content.nome}
          onChange={onTituloChange}
        />
        <EditItem
          title="Descrição"
          tooltip="Digite um resumo breve do projeto ou ação."
          // IconComponent={StoreIcon}
          value={content.descricao}
          onChange={onDescricaoChange}
        />

        <EditItem
          title="Status"
          tooltip="Selecione o status do projeto."
          // IconComponent={StoreIcon}
          value={content.status}
          onChange={onStatusChange}
          MUIComponents={true} 
        />
       
        <EditItem
          title="Programa"
          tooltip="Selecione o programa governamental relacionado."
          // IconComponent={StoreIcon}
          value={JSON.stringify(content.programa)}
          onChange={onProgramaChange}
          MUIComponents={true} 
        />

       <EditItem
          title="Tema"
          tooltip="Selecione o tema principal do projeto."
          // IconComponent={StoreIcon}
          value={content.tema}
          onChange={onTemaChange}
          MUIComponents={true} 
        />
                
        <EditItem
          title="Órgão"
          tooltip="Selecione o órgão governamental responsável/relacionado."
          // IconComponent={StoreIcon}
          value={content.orgao}
          onChange={onOrgaoChange}
          MUIComponents={true} 
        />
        <EditItem
          title="Total Investido"
          tooltip="Digite o valor total em reais."
          // IconComponent={StoreIcon}
          value={content.investimento}
          onChange={onTotalInvestidoChange}
        />
        <EditItem
          title="Cariocas Atendidos"
          tooltip="Digite o número estimado de beneficiados."
          // IconComponent={StoreIcon}
          value={content.cariocas_atendidos}
          onChange={onCariocasAtendidosChange}
        />
        <EditItem
          title="Data Início"
          tooltip="Digite ou selecione o mês e ano de início."
          // IconComponent={StoreIcon}
          value={content.data_inicio}
          onChange={onDataInicioChange}
          MUIComponents={true} 
        />
        <EditItem
          title="Data Fim"
          tooltip="Digite ou selecione o mês e ano de conclusão."
          // IconComponent={StoreIcon}
          value={content.data_fim}
          onChange={onDataFimChange}
          MUIComponents={true} 
        />
          <div className={classes.bottomDiv}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.wideButton}
            onClick={onUpdateLocation}
          >
             <PlaceIcon  className={classes.bottonIcon} />
         <span style={{color:"#007E7D", fontSize:"16px"}}> Atualizar localização </span>
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
          disabled={habilitaBotao()}
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
