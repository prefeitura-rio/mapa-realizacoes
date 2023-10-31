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
import domiciliosIcon from '../../../icons/domicilios.png';
import subprefeituraIcon from '../../../icons/subprefeitura.png';
import habitantesIcon from '../../../icons/cariocas_atendidos.png';
import programaIcon from '../../../icons/programa.png';
import ipsIcon from '../../../icons/ips.png';


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

const ListInfoSumario = ({ 
  dadosAgregadosAbaSumarioInfoBasicasCidade,
  dadosAgregadosAbaSumarioStatusEntregasBairro, 
  dadosAgregadosAbaSumarioStatusEntregasCidade, 
  bairroInfo, 
}) => {

  const classes = useStyles();

  const listInfoSumario = [
  
   //municipio
    { text:  dadosAgregadosAbaSumarioInfoBasicasCidade? dadosAgregadosAbaSumarioInfoBasicasCidade.domicilios + " domicílios" + " em 2010" : undefined, iconComponent: () => <img src={domiciliosIcon} alt="Orgao" style={{width: '20px', height: '20px'}}/> },
    { text:  dadosAgregadosAbaSumarioInfoBasicasCidade? dadosAgregadosAbaSumarioInfoBasicasCidade.habitantes + " habitantes" : undefined, iconComponent: () => <img src={habitantesIcon} alt="Cariocas Atendidos" style={{width: '20px', height: '20px'}}/> },
    
    //bairro
    { text:  bairroInfo? bairroInfo.domicilios + " domicílios" + " em 2010" : undefined, iconComponent: () => <img src={domiciliosIcon} alt="Orgao" style={{width: '20px', height: '20px'}}/> },
    { text:  bairroInfo? bairroInfo.habitantes + " habitantes" : undefined, iconComponent: () => <img src={habitantesIcon} alt="Cariocas Atendidos" style={{width: '20px', height: '20px'}}/> },
    { text:  bairroInfo? bairroInfo.ips + " IPS" : undefined, iconComponent: () => <img src={ipsIcon} alt="ips" style={{width: '20px', height: '20px'}}/> },
    { text:  bairroInfo? bairroInfo.ranking_ips + "°" + " no rank IPS": undefined, iconComponent: () => <img src={ipsIcon} alt="rank ips" style={{width: '20px', height: '20px'}}/> },
   
    //subprefeitura

  ];

   const statusList = [

    //municipio
   
    { text: dadosAgregadosAbaSumarioStatusEntregasCidade?.concluida? "Concluído " + dadosAgregadosAbaSumarioStatusEntregasCidade.concluida + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasCidade?.em_andamento? "Em andamento " + dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento  + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasCidade?.interrompida? "Interrompida " + dadosAgregadosAbaSumarioStatusEntregasCidade.interrompida  + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasCidade?.em_licitacao? "Em licitação " + dadosAgregadosAbaSumarioStatusEntregasCidade.em_licitacao  + " obras" : undefined},
 
    //bairro
   
    { text: dadosAgregadosAbaSumarioStatusEntregasBairro? "Concluído " + dadosAgregadosAbaSumarioStatusEntregasBairro.concluida + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasBairro? "Em andamento " + dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento  + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasBairro? "Interrompida " + dadosAgregadosAbaSumarioStatusEntregasBairro.interrompida  + " obras" : undefined},
    { text: dadosAgregadosAbaSumarioStatusEntregasBairro? "Em licitação " + dadosAgregadosAbaSumarioStatusEntregasBairro.em_licitacao  + " obras" : undefined},
 
  ];

  return (
    <>
     <Typography className={classes.title}>
        Informações Básicas
      </Typography>
    <List>
{listInfoSumario.map((item, i) => (
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
                    <item.iconComponent/>
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

     {/* Adicione um Divider para separar as sessões */}
     <Divider />
     <br></br>
    
     <Typography className={classes.title}>
  Status das entregas
</Typography>
<List>
  {/* Conteúdo da nova sessão "Novos Status" aqui (sem ícones) */}
  {statusList
    .filter((item) => item.text !== undefined) // Filtra os itens com text definido
    .map((item, i) => (
      <ListItem
        button
        classes={{ gutters: classes.listItemGutters }}
        key={i}
      >
        <ListItemText
          primary={item.text}
          primaryTypographyProps={{ variant: 'body2' }}
          classes={{ root: classes.marginZero }}
        />
      </ListItem>
    ))}
</List>
  </>
  );
};
export default ListInfoSumario;
