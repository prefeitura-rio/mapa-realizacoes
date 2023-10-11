import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography 
} from "@material-ui/core";
import React from 'react';
import bairroIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/bairro.png';
import cariocasAtendidosIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/cariocas_atendidos.png';
import dataFimIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/data_fim.png';
import dataInicioIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/data_inicio.png';
import investimentoIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/investimento.png';
import orgaoIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/orgao.png';
import programaIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/programa.png';
import subprefeituraIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/subprefeitura.png';
import temaIcon from 'C:/Users/Lucas S. Tavares/OneDrive/Área de Trabalho/MAPA REALIZACÕES/src/icons/tema.png';



import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import PublicIcon from "@material-ui/icons/Public";
import CallIcon from "@material-ui/icons/Call";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import moment from "moment";

import API_KEY_GOOGLE from "../../API_KEY_GOOGLE";
import { subprefeituras } from "../../subprefeituras";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: { 
    // margin: theme.spacing(2, 0), 
    // fontSize: '1.5em' 
    padding: "24px 24px 9px 24px",
    // paddingLeft: "24px",
    fontSize:"15px",
    fontWeight:"bold"
  },
  marginZero: {
    margin: 0,
  },
  listItemIcon: {
    minWidth: "48px",
  },
  listItemGutters: {
    paddingRight: "24px",
    paddingLeft: "24px",
  },
}));

// Função que mapeia bairros para subprefeituras
function mapearSubprefeitura(bairro) {
  // Verifique se o bairro existe no mapeamento
  return subprefeituras[bairro] || "Subprefeitura não encontrada";
}

// Função que mapeia bairros para subprefeituras
function mapearSubprefeitura(bairro) {
  // Verifique se o bairro existe no mapeamento
  return subprefeituras[bairro] || "Subprefeitura não encontrada";
}

const ListInfo = ({ content }) => {
  const classes = useStyles();
  const [bairro, setBairro] = useState('');
  const [subprefeitura, setSubprefeitura] = useState('');
  const [openOrgaos, setOpenOrgaos] = useState(false); // Controla o menu suspenso dos órgãos
  const [openTemas, setOpenTemas] = useState(false); // Controla o menu suspenso dos temas

  const handleClickOrgaos = () => {
    setOpenOrgaos(!openOrgaos); // Inverte o estado atual do menu suspenso dos órgãos
  };
  const handleClickTemas = () => {
    setOpenTemas(!openTemas); // Inverte o estado atual do menu suspenso dos órgãos
  };
  const getBairro = async (latitude, longitude) => {
    try {
      console.log('Iniciando busca de bairro...');
      const apiKey = API_KEY_GOOGLE.apiKey;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      const { results } = response.data;

      if (results && results.length > 0) {
        const enderecoComponents = results[0].address_components;
        const bairroComponent = enderecoComponents.find(component =>
          component.types.includes("sublocality_level_1") || component.types.includes("sublocality")
        );

        if (bairroComponent) {
          const bairroEncontrado = bairroComponent.long_name;
          setBairro(bairroEncontrado);
          console.log('Bairro encontrado:', bairroEncontrado);

          // Determine a subprefeitura com base no bairro
          const subprefeituraEncontrada = mapearSubprefeitura(bairroEncontrado);
          setSubprefeitura(subprefeituraEncontrada);
          console.log('Subprefeitura:', subprefeituraEncontrada);
        } else {
          setBairro('Bairro não encontrado');
          console.log('Nenhum bairro encontrado no endereço retornado.');
        }
      } else {
        setBairro('Bairro não encontrado');
        console.log('Nenhum resultado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar o bairro:', error);
      setBairro('Erro ao buscar o bairro');
    }
  };

  useEffect(() => {
    if (content.coords) {
      const { latitude, longitude } = content.coords;
      getBairro(latitude, longitude);
    }
  }, [content]);

  // const orgaos = content.orgao.map((orgao, index) => ({ text: orgao, iconComponent: PublicIcon }));
  // const temas = content.tema.map((tema, index) => ({ text: tema, iconComponent: PublicIcon }));

  const listInfo = [
  
    // { text: content.programa, iconComponent: PublicIcon },
    { text: content.programa, iconComponent: () => <img src={programaIcon} alt="Programa" style={{width: '20px', height: '20px'}}/> },
    // { text: content.orgao, iconComponent: PublicIcon },
    { text: content.orgao, iconComponent: () => <img src={orgaoIcon} alt="Orgao" style={{width: '20px', height: '20px'}}/> },
    // { text: content.tema, iconComponent: PublicIcon },
    { text: content.tema, iconComponent: () => <img src={temaIcon} alt="Tema" style={{width: '20px', height: '20px'}}/> },
    // { text: content.bairro, iconComponent: PublicIcon },
    { text: content.bairro, iconComponent: () => <img src={bairroIcon} alt="Bairro" style={{width: '20px', height: '20px'}}/> },
    // { text: content.subprefeitura, iconComponent: PublicIcon},
    { text: content.subprefeitura, iconComponent: () => <img src={subprefeituraIcon} alt="Subprefeitura" style={{width: '20px', height: '20px'}}/> },
    // { text: "R$ " +  content.totalInvestido + " investidos", iconComponent: PublicIcon},
    { text: content.investimentoIcon, iconComponent: () => <img src={investimentoIcon} alt="Total Investido" style={{width: '20px', height: '20px'}}/> },
    // { text: content.cariocasAtendidos + " cariocas atendidos", iconComponent: PublicIcon},
    { text: content.cariocasAtendidos, iconComponent: () => <img src={cariocasAtendidosIcon} alt="Cariocas Atendidos" style={{width: '20px', height: '20px'}}/> },
    // { text: content.dataInicio + " início", iconComponent: PublicIcon},
    { text: content.dataInicio, iconComponent: () => <img src={dataInicioIcon} alt="Data Inicio" style={{width: '20px', height: '20px'}}/> },
    // { text: content.dataFim + " fim", iconComponent: PublicIcon},
    { text: content.dataFim, iconComponent: () => <img src={dataFimIcon} alt="Data Fim" style={{width: '20px', height: '20px'}}/> },
   
  ];

  return (
    <>
     <Typography className={classes.title}>
        Informações Básicas
      </Typography>
    <List>
{listInfo.map((item, i) => (
    <React.Fragment key={i}>
        {Array.isArray(item.text) ? (
            item.text.map((textItem, j) => (
                <ListItem
                    button
                    classes={{ gutters: classes.listItemGutters }}
                    key={textItem}
                >
                    {j === 0 ? (
                        <ListItemIcon classes={{ root: classes.listItemIcon }}>
                            <item.iconComponent/>
                        </ListItemIcon>
                    ) : (
                        <ListItemIcon classes={{ root: classes.listItemIcon }}>
                            {/* espaço vazio, mantém alinhamento mas sem ícone */}
                        </ListItemIcon>
                    )}
                    <ListItemText
                        primary={textItem}
                        primaryTypographyProps={{ variant: 'body2' }}
                        classes={{ root: classes.marginZero }}
                    />
                </ListItem>
            ))
        ) : item.text ? (
            <ListItem
              button
              classes={{ gutters: classes.listItemGutters }}
              key={item.text}
              onClick={i === 1 ? handleClickOrgaos : i === 2 ? handleClickTemas : null}
              button
              classes={{ gutters: classes.listItemGutters }}
              key={item.text}
              onClick={i === 1 ? handleClickOrgaos : i === 2 ? handleClickTemas : null}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <item.iconComponent color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ variant: 'body2' }}
                classes={{ root: classes.marginZero }}
              />
              {i === 1 ? (openOrgaos ? <ExpandLess /> : <ExpandMore />) : 
               i === 2 ? (openTemas ? <ExpandLess /> : <ExpandMore />) : null}
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <item.iconComponent color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ variant: 'body2' }}
                classes={{ root: classes.marginZero }}
              />
              {i === 1 ? (openOrgaos ? <ExpandLess /> : <ExpandMore />) : 
               i === 2 ? (openTemas ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
        ) : null}
    </React.Fragment>
))}

    </List>
    </>
  );
  
  
  
  
};
export default ListInfo;
