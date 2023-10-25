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
import bairroIcon from '../../icons/bairro.png';
import dataFimIcon from '../../icons/data_fim.png';
import dataInicioIcon from '../../icons/data_inicio.png';
import investimentoIcon from '../../icons/investimento.png';
import orgaoIcon from '../../icons/orgao.png';
import programaIcon from '../../icons/programa.png';
import subprefeituraIcon from '../../icons/subprefeitura.png';
import temaIcon from '../../icons/tema.png';
import cariocasAtendidosIcon from '../../icons/cariocas_atendidos.png';


const useStyles = makeStyles((theme) => ({
  root: {},
  title: { 
    // margin: theme.spacing(2, 0), 
    // fontSize: '1.5em' 
    padding: "4px 24px 9px 24px",
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

const ListInfo = ({ content }) => {
  const classes = useStyles();

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
    // { text: "R$ " +  content.investimento + " investidos", iconComponent: PublicIcon},
    { text: "R$ " + content.investimento + ",00 " + "investidos", iconComponent: () => <img src={investimentoIcon} alt="Total Investido" style={{width: '20px', height: '20px'}}/> },
    // { text: content.cariocas_atendidos + " cariocas atendidos", iconComponent: PublicIcon},
    { text: content.cariocas_atendidos + " cariocas atendidos", iconComponent: () => <img src={cariocasAtendidosIcon} alt="Cariocas Atendidos" style={{width: '20px', height: '20px'}}/> },
    // { text: content.data_inicio + " início", iconComponent: PublicIcon},
    { text: content.data_inicio + " inicio", iconComponent: () => <img src={dataInicioIcon} alt="Data Inicio" style={{width: '20px', height: '20px'}}/> },
    // { text: content.data_fim + " fim", iconComponent: PublicIcon},
    { text: content.data_fim + " fim", iconComponent: () => <img src={dataFimIcon} alt="Data Fim" style={{width: '20px', height: '20px'}}/> },
   
  ];

  console.log("content: ", (content))

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
    </React.Fragment>
))}

    </List>
    </>
  );
};
export default ListInfo;
