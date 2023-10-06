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

// Função que mapeia bairros para subprefeituras
function mapearSubprefeitura(bairro) {
  const subprefeituras = {
    "Barra da Tijuca": "Subprefeitura da Barra e Jacarepaguá",
    "Recreio": "Subprefeitura da Barra e Jacarepaguá",
    "Vargem Grande": "Subprefeitura da Barra e Jacarepaguá",
    "Vargem Pequena": "Subprefeitura da Barra e Jacarepaguá",
    "Jacarepaguá": "Subprefeitura da Barra e Jacarepaguá",
    "Taquara": "Subprefeitura da Barra e Jacarepaguá",
    "Praça Seca": "Subprefeitura da Barra e Jacarepaguá",
    "Anil": "Subprefeitura da Barra e Jacarepaguá",
    "Curicica": "Subprefeitura da Barra e Jacarepaguá",
    "Freguesia": "Subprefeitura da Barra e Jacarepaguá",
    "Pechincha": "Subprefeitura da Barra e Jacarepaguá",
    "Tanque": "Subprefeitura da Barra e Jacarepaguá",
    "Cidade de Deus": "Subprefeitura da Barra e Jacarepaguá",
    "Gardênia": "Subprefeitura da Barra e Jacarepaguá",
    "Itanhangá": "Subprefeitura da Barra e Jacarepaguá",
    "Vila Valqueire": "Subprefeitura da Barra e Jacarepaguá",
    //
    "Catete": "Subprefeitura da Zona Sul",
    "Cosme Velho": "Subprefeitura da Zona Sul",
    "Laranjeiras": "Subprefeitura da Zona Sul",
    "Flamengo": "Subprefeitura da Zona Sul",
    "Botafogo": "Subprefeitura da Zona Sul",
    "Urca": "Subprefeitura da Zona Sul",
    "Humaitá": "Subprefeitura da Zona Sul",
    "Leme": "Subprefeitura da Zona Sul",
    "Copacabana": "Subprefeitura da Zona Sul",
    "Ipanema": "Subprefeitura da Zona Sul",
    "Leblon": "Subprefeitura da Zona Sul",
    "Lagoa": "Subprefeitura da Zona Sul",
    "Jardim Botânico": "Subprefeitura da Zona Sul",
    "Gávea": "Subprefeitura da Zona Sul",
    "São Conrado": "Subprefeitura da Zona Sul",
    "Vidigal": "Subprefeitura da Zona Sul",
    "Rocinha": "Subprefeitura da Zona Sul",
    "Parque do Flamengo": "Subprefeitura da Zona Sul",

    //

    "Tijuca": "Subprefeitura da Grande Tijuca",
    "Alto da Boa Vista": "Subprefeitura da Grande Tijuca",
    "Praça da Bandeira": "Subprefeitura da Grande Tijuca",
    "Maracanã": "Subprefeitura da Grande Tijuca",
    "Grajaú": "Subprefeitura da Grande Tijuca",
    "Vila Isabel": "Subprefeitura da Grande Tijuca",
    "Andaraí": "Subprefeitura da Grande Tijuca",

    //

    "Bonsucesso": "Subprefeitura da Zona Norte",
    "Olaria": "Subprefeitura da Zona Norte",
    "Ramos": "Subprefeitura da Zona Norte",
    "Brás de Pina": "Subprefeitura da Zona Norte",
    "Penha": "Subprefeitura da Zona Norte",
    "Penha Circular": "Subprefeitura da Zona Norte",
    "Del Castilho": "Subprefeitura da Zona Norte",
    "Engenho da Rainha": "Subprefeitura da Zona Norte",
    "Inhaúma": "Subprefeitura da Zona Norte",
    "Higienópolis": "Subprefeitura da Zona Norte",
    "Maria da Graça": "Subprefeitura da Zona Norte",
    "Tomaz Coelho": "Subprefeitura da Zona Norte",
    "Abolição": "Subprefeitura da Zona Norte",
    "Água Santa": "Subprefeitura da Zona Norte",
    "Cachambi": "Subprefeitura da Zona Norte",
    "Consolação": "Subprefeitura da Zona Norte",
    "Encantado": "Subprefeitura da Zona Norte",
    "Engenho de Dentro": "Subprefeitura da Zona Norte",
    "Engenho Novo": "Subprefeitura da Zona Norte",
    "Jacaré": "Subprefeitura da Zona Norte",
    "Lins de Vasconcelos": "Subprefeitura da Zona Norte",
    "Méier": "Subprefeitura da Zona Norte",
    "Piedade": "Subprefeitura da Zona Norte",
    "Pilares": "Subprefeitura da Zona Norte",
    "Riachuelo": "Subprefeitura da Zona Norte",
    "Rocha": "Subprefeitura da Zona Norte",
    "Sampaio Correia": "Subprefeitura da Zona Norte",
    "São Francisco Xavier": "Subprefeitura da Zona Norte",
    "Todos os Santos": "Subprefeitura da Zona Norte",
    "Colégio": "Subprefeitura da Zona Norte",
    "Irajá": "Subprefeitura da Zona Norte",
    "Vicente de Carvalho": "Subprefeitura da Zona Norte",
    "Vila da Penha": "Subprefeitura da Zona Norte",
    "Vila Kosmos": "Subprefeitura da Zona Norte",
    "Vista Alegre": "Subprefeitura da Zona Norte",
    "Bento Ribeiro": "Subprefeitura da Zona Norte",
    "Campinho": "Subprefeitura da Zona Norte",
    "Cascadura": "Subprefeitura da Zona Norte",
    "Cavalcante": "Subprefeitura da Zona Norte",
    "Engenheiro Leal": "Subprefeitura da Zona Norte",
    "Honório Gurgel": "Subprefeitura da Zona Norte",
    "Madureira": "Subprefeitura da Zona Norte",
    "Marechal Hermes": "Subprefeitura da Zona Norte",
    "Oswaldo Cruz": "Subprefeitura da Zona Norte",
    "Quintino Bocauiuva": "Subprefeitura da Zona Norte",
    "Rocha Miranda": "Subprefeitura da Zona Norte",
    "Turiaçú": "Subprefeitura da Zona Norte",
    "Vaz Lobo": "Subprefeitura da Zona Norte",
    "Bancários": "Subprefeitura da Zona Norte",
    "Cacuia": "Subprefeitura da Zona Norte",
    "Cidade Universitária": "Subprefeitura da Zona Norte",
    "Cocotá": "Subprefeitura da Zona Norte",
    "Freguesia (Ilha)": "Subprefeitura da Zona Norte",
    "Galeão": "Subprefeitura da Zona Norte",
    "Jardim Carioca": "Subprefeitura da Zona Norte",
    "Jardim Guanabara": "Subprefeitura da Zona Norte",
    "Moneró": "Subprefeitura da Zona Norte",
    "Pitangueiras": "Subprefeitura da Zona Norte",
    "Portuguesa": "Subprefeitura da Zona Norte",
    "Praia da Bandeira": "Subprefeitura da Zona Norte",
    "Ribeira": "Subprefeitura da Zona Norte",
    "Tauá": "Subprefeitura da Zona Norte",
    "Zumbi": "Subprefeitura da Zona Norte",
    "Anchieta": "Subprefeitura da Zona Norte",
    "Guadalupe": "Subprefeitura da Zona Norte",
    "Mariópolis": "Subprefeitura da Zona Norte",
    "Parque Anchieta": "Subprefeitura da Zona Norte",
    "Ricardo de Albuquerque": "Subprefeitura da Zona Norte",
    "Acari": "Subprefeitura da Zona Norte",
    "Barros Filho": "Subprefeitura da Zona Norte",
    "Coelho Neto": "Subprefeitura da Zona Norte",
    "Costa Barros": "Subprefeitura da Zona Norte",
    "Parque Colúmbia": "Subprefeitura da Zona Norte",
    "Pavuna": "Subprefeitura da Zona Norte",
    "Jacarezinho": "Subprefeitura da Zona Norte",
    "Vieira Fazenda": "Subprefeitura da Zona Norte",
    "Complexo de Manguinhos": "Subprefeitura da Zona Norte",
    "Complexo do Alemão": "Subprefeitura da Zona Norte",
    "Baixa do Sapateiro": "Subprefeitura da Zona Norte",
    "Conjunto Pinheiros": "Subprefeitura da Zona Norte",
    "Marcílio Dias": "Subprefeitura da Zona Norte",
    "Maré": "Subprefeitura da Zona Norte",
    "Nova Holanda": "Subprefeitura da Zona Norte",
    "Parque União": "Subprefeitura da Zona Norte",
    "Praia de Ramos": "Subprefeitura da Zona Norte",
    "Roquete Pinto": "Subprefeitura da Zona Norte",
    "Rubens Vaz": "Subprefeitura da Zona Norte",
    "Timbaú": "Subprefeitura da Zona Norte",
    "Vila do João": "Subprefeitura da Zona Norte",
    "Vila Esperança": "Subprefeitura da Zona Norte",
    "Vila Pinheiro": "Subprefeitura da Zona Norte",
    "Cordovil": "Subprefeitura da Zona Norte",
    "Jardim América": "Subprefeitura da Zona Norte",
    "Parada de Lucas": "Subprefeitura da Zona Norte",
    "Vigário Geral": "Subprefeitura da Zona Norte",

    //

    "Bangu": "Subprefeitura da Zona Oeste",
    "Gericinó": "Subprefeitura da Zona Oeste",
    "Padre Miguel": "Subprefeitura da Zona Oeste",
    "Santíssimo": "Subprefeitura da Zona Oeste",
    "Senador Câmara": "Subprefeitura da Zona Oeste",
    "Campo Grande": "Subprefeitura da Zona Oeste",
    "Cosmos": "Subprefeitura da Zona Oeste",
    "Inhoaíba": "Subprefeitura da Zona Oeste",
    "Senador Augusto Vasconcelos": "Subprefeitura da Zona Oeste",
    "Paciência": "Subprefeitura da Zona Oeste",
    "Santa Cruz": "Subprefeitura da Zona Oeste",
    "Barra de Guaratiba": "Subprefeitura da Zona Oeste",
    "Guaratiba": "Subprefeitura da Zona Oeste",
    "Ilha de Guaratiba": "Subprefeitura da Zona Oeste",
    "Pedra de Guaratiba": "Subprefeitura da Zona Oeste",
    "Sepetiba": "Subprefeitura da Zona Oeste",
    "Campo dos Afonsos": "Subprefeitura da Zona Oeste",
    "Deodoro": "Subprefeitura da Zona Oeste",
    "Magalhães Bastos": "Subprefeitura da Zona Oeste",
    "Realengo": "Subprefeitura da Zona Oeste",
    "Mallet": "Subprefeitura da Zona Oeste",
    "Sulacap": "Subprefeitura da Zona Oeste",
    "Vila Militar": "Subprefeitura da Zona Oeste",

    //

    "Bairro de Fátima": "Subprefeitura do Centro e Centro Histórico",
    "Benfica": "Subprefeitura do Centro e Centro Histórico",
    "Caju": "Subprefeitura do Centro e Centro Histórico",
    "Catumbi": "Subprefeitura do Centro e Centro Histórico",
    "Centro": "Subprefeitura do Centro e Centro Histórico",
    "Cidade Nova": "Subprefeitura do Centro e Centro Histórico",
    "Estácio": "Subprefeitura do Centro e Centro Histórico",
    "Gamboa": "Subprefeitura do Centro e Centro Histórico",
    "Glória": "Subprefeitura do Centro e Centro Histórico",
    "Lapa": "Subprefeitura do Centro e Centro Histórico",
    "Mangueira": "Subprefeitura do Centro e Centro Histórico",
    "Saúde": "Subprefeitura do Centro e Centro Histórico",
    "Santa Teresa": "Subprefeitura do Centro e Centro Histórico",
    "Santo Cristo": "Subprefeitura do Centro e Centro Histórico",
    "São Cristóvão": "Subprefeitura do Centro e Centro Histórico",
    "Rio Comprido": "Subprefeitura do Centro e Centro Histórico",
    "Vasco da Gama": "Subprefeitura do Centro e Centro Histórico",
    "Ilha de Paquetá": "Subprefeitura do Centro e Centro Histórico",

    "Ribeira": "Subprefeitura da Ilha do Governador",
    "Zumbi": "Subprefeitura da Ilha do Governador",
    "Pitangueiras": "Subprefeitura da Ilha do Governador",
    "Bandeira": "Subprefeitura da Ilha do Governador",
    "Cacuia": "Subprefeitura da Ilha do Governador",
    "Jardim Guanabara": "Subprefeitura da Ilha do Governador",
    "Jardim Carioca": "Subprefeitura da Ilha do Governador",
    "Portuguesa": "Subprefeitura da Ilha do Governador",
    "Moneró": "Subprefeitura da Ilha do Governador",
    "Cocota": "Subprefeitura da Ilha do Governador",
    "Tauá": "Subprefeitura da Ilha do Governador",
    "Bancários": "Subprefeitura da Ilha do Governador",
    "Freguesia": "Subprefeitura da Ilha do Governador",
    "Cidade Universitária": "Subprefeitura da Ilha do Governador",
    "Galeão": "Subprefeitura da Ilha do Governador",
    "Jardim Carioca": "Subprefeitura da Ilha do Governador",
    "Jardim Guanabara": "Subprefeitura da Ilha do Governador",
    "Moneró": "Subprefeitura da Ilha do Governador",
    "Pitangueiras": "Subprefeitura da Ilha do Governador",
    "Portuguesa": "Subprefeitura da Ilha do Governador",
    "Praia da Bandeira": "Subprefeitura da Ilha do Governador",
    "Ribeira": "Subprefeitura da Ilha do Governador",
    "Tauá": "Subprefeitura da Ilha do Governador",
    "Zumbi": "Subprefeitura da Ilha do Governador",
  }
  // Verifique se o bairro existe no mapeamento
  return subprefeituras[bairro] || "Subprefeitura não encontrada";
}

const ListInfo = ({ content }) => {
  const classes = useStyles();
  const [bairro, setBairro] = useState('');
  const [subprefeitura, setSubprefeitura] = useState('');

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

  const orgaos = content.orgao.map((orgao, index) => ({ text: orgao, iconComponent: PublicIcon }));

  const listInfo = [
    { text: content.programa, iconComponent: PublicIcon },
    ...orgaos, // Adicione os órgãos diretamente aqui
    { text: bairro, iconComponent: PublicIcon }, // Use o estado bairro aqui
    { text: subprefeitura, iconComponent: PublicIcon }, // Use o estado subprefeitura aqui
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
          {/* {i === 3 && <Divider />} Adicionar Divider após subprefeitura */}
          {/* {i === 5 && <Divider />} Adicionar Divider após cariocasAtendidos */}
        </React.Fragment>
      ))}
    </List>
  );
};
export default ListInfo;
