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

import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import PublicIcon from "@material-ui/icons/Public";
import CallIcon from "@material-ui/icons/Call";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import moment from "moment";

import API_KEY_GOOGLE from "../../API_KEY_GOOGLE";

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

const ListInfo = ({ content }) => {
  const classes = useStyles();
  const [bairro, setBairro] = useState('');

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
          setBairro(bairroComponent.long_name);
          console.log('Bairro encontrado:', bairroComponent.long_name);
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
      // Se 'coords' estiver presente em 'content', chame a função getBairro
      const { latitude, longitude } = content.coords;
      getBairro(latitude, longitude);
    }
  }, [content]);

  const listInfo = [
  
    { text: content.programa, iconComponent: PublicIcon },
    { text: content.orgao, iconComponent: PublicIcon },
    { text: bairro, iconComponent: PublicIcon }, // Usar o estado bairro aqui
    { text: content.subprefeitura, iconComponent: PublicIcon},
    { text: "R$ " +  content.totalInvestido + ",00" + " investidos", iconComponent: PublicIcon},
    { text: content.cariocasAtendidos + " cariocas atendidos", iconComponent: PublicIcon},
    { text: content.dataInicio + " início", iconComponent: PublicIcon},
    { text: content.dataFim + " fim", iconComponent: PublicIcon},
   
  ];

  return (
    <List>
      {listInfo.map((item, i) => (
    <React.Fragment key={i}>
        {item.text ? (
            <ListItem
                button
                classes={{ gutters: classes.listItemGutters }}
                key={item.text}
            >
                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                    <item.iconComponent color="primary" />
                </ListItemIcon>
                <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ variant: 'body2' }}
                    classes={{ root: classes.marginZero }}
                />
            </ListItem>
        ) : null}
        {i === 3 && <Divider/>} {/* Adicionar Divider após subprefeitura */}
        {i === 5 && <Divider />} {/* Adicionar Divider após cariocasAtendidos */}
    </React.Fragment>
))}

    </List>
  );
};
export default ListInfo;
