import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


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
    { text: content.programa, iconComponent: PublicIcon },
    { text: 'Órgãos', iconComponent: PublicIcon }, // Item clicável para mostrar os órgãos
    { text: 'Temas', iconComponent: PublicIcon }, // Item clicável para mostrar os temas
    { text: content.bairro, iconComponent: PublicIcon },
    { text: subprefeitura, iconComponent: PublicIcon },
    { text: "R$ " + content.totalInvestido + ",00" + " investidos", iconComponent: PublicIcon },
    { text: content.cariocasAtendidos + " cariocas atendidos", iconComponent: PublicIcon },
    { text: content.dataInicio + " início", iconComponent: PublicIcon },
    { text: content.dataFim + " fim", iconComponent: PublicIcon },
  ];

  return (
    <List>
      {listInfo.map((item, i) => (
        <React.Fragment key={i}>
          {item.text ? (
        <React.Fragment key={i}>
          {item.text ? (
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
          {i === 1 && (
            <Collapse in={openOrgaos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {content.orgao.map((orgao, index) => (
                  <ListItem button className={classes.nested} key={index}>
                     <ListItemIcon>
                      {/* <PublicIcon /> */}
                    </ListItemIcon>
                    <ListItemText primary={orgao} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
          {i === 2 && (
            <Collapse in={openTemas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Array.isArray(content.tema) ? content.tema.map((tema, index) => (
                  <ListItem button className={classes.nested} key={index}>
                    <ListItemIcon>
                      {/* <PublicIcon /> */}
                    </ListItemIcon>
                    <ListItemText primary={tema} />
                  </ListItem>
                )) : null}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
          ) : null}
          {i === 1 && (
            <Collapse in={openOrgaos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {content.orgao.map((orgao, index) => (
                  <ListItem button className={classes.nested} key={index}>
                     <ListItemIcon>
                      {/* <PublicIcon /> */}
                    </ListItemIcon>
                    <ListItemText primary={orgao} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
          {i === 2 && (
            <Collapse in={openTemas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Array.isArray(content.tema) ? content.tema.map((tema, index) => (
                  <ListItem button className={classes.nested} key={index}>
                    <ListItemIcon>
                      {/* <PublicIcon /> */}
                    </ListItemIcon>
                    <ListItemText primary={tema} />
                  </ListItem>
                )) : null}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
  
  
  
  
};
export default ListInfo;
