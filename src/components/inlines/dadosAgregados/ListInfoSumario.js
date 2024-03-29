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
import rankIpsIcon from '../../../icons/trofeu.png';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Loading from "../../../utils/loading";
import { connect } from "react-redux";
import { BAIRRO_DESCRIPTION_BAR, MAIN_UNDERSEARCH_BAR, SUBPREFEITURA_DESCRIPTION_BAR } from "../../../redux/active/actions";


const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    // margin: theme.spacing(2, 0), 
    // fontSize: '1.5em' 
    padding: "4px 24px 9px 24px",
    // paddingLeft: "24px",
    fontSize: "15px",
    fontWeight: "bold"
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
  bairroInfo,
  dadosAgregadosAbaSumarioStatusEntregasBairro,
  dadosAgregadosAbaSumarioInfoBasicasCidade,
  dadosAgregadosAbaSumarioStatusEntregasCidade,
  dadosAgregadosAbaSumarioInfoBasicasSubprefeitura,
  dadosAgregadosAbaSumarioStatusEntregasSubprefeitura,
  activeBar
}) => {

  const classes = useStyles();

  const listInfoSumario = [

    // municipio
    {
      text: dadosAgregadosAbaSumarioStatusEntregasCidade?.em_andamento
        ? (
          <span>
            {dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento?.toLocaleString('pt-BR')}
            {' '}
            <span>obras em andamento</span>
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento != 0) ? <Loading /> : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento == 0 ? <span>
          <span > 0 obras em andamento</span>
        </span> : undefined),
      iconComponent: () => (
        <img src={subprefeituraIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: dadosAgregadosAbaSumarioInfoBasicasCidade
        ? (
          <span>
            {dadosAgregadosAbaSumarioInfoBasicasCidade.domicilios?.toLocaleString('pt-BR')}
            {' '}
            <span>domicílios</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioInfoBasicasCidade.domicilios != 0) ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={domiciliosIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: dadosAgregadosAbaSumarioInfoBasicasCidade
        ? (
          <span>
            {dadosAgregadosAbaSumarioInfoBasicasCidade.habitantes?.toLocaleString('pt-BR')}
            {' '}
            <span>habitantes</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioInfoBasicasCidade.habitantes != 0) ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={habitantesIcon} alt="Cariocas Atendidos" style={{ width: '20px', height: '20px' }} />
      )
    },

    // subprefeitura
    {
      text: dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.em_andamento
        ? (
          <span>
            {dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento?.toLocaleString('pt-BR')}{' '}
            <span>obras em andamento</span>
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento != 0) ? <Loading /> : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento == 0 ? <span>
          <span > 0 obras em andamento</span>
        </span> : undefined),
      iconComponent: () => (
        <img src={subprefeituraIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: dadosAgregadosAbaSumarioInfoBasicasSubprefeitura
        ? (
          <span>
            {dadosAgregadosAbaSumarioInfoBasicasSubprefeitura.domicilios?.toLocaleString('pt-BR')}
            {' '}
            <span>domicílios</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioInfoBasicasSubprefeitura.domicilios != 0) ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={domiciliosIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: dadosAgregadosAbaSumarioInfoBasicasSubprefeitura
        ? (
          <span>
            {dadosAgregadosAbaSumarioInfoBasicasSubprefeitura.habitantes?.toLocaleString('pt-BR')}
            {' '}
            <span>habitantes</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioInfoBasicasSubprefeitura.habitantes != 0) ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={habitantesIcon} alt="Cariocas Atendidos" style={{ width: '20px', height: '20px' }} />
      )
    },

    // bairro
    {
      text: dadosAgregadosAbaSumarioStatusEntregasBairro?.em_andamento
        ? (
          <span>
            Em andamento {dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento?.toLocaleString('pt-BR')}{' '}
            <span>obras</span>
          </span>
        )
        : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento != 0) ? <Loading /> : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento == 0 ? <span>
          <span > 0 obras em andamento</span>
        </span> : undefined),
      iconComponent: () => (
        <img src={subprefeituraIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: bairroInfo
        ? (
          <span>
            {bairroInfo.domicilios?.toLocaleString('pt-BR')}
            {' '}
            <span>domicílios</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : activeBar === BAIRRO_DESCRIPTION_BAR ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={domiciliosIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: bairroInfo
        ? (
          <span>
            {bairroInfo.habitantes?.toLocaleString('pt-BR')}
            {' '}
            <span>habitantes</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : activeBar === BAIRRO_DESCRIPTION_BAR ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={habitantesIcon} alt="Cariocas Atendidos" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: bairroInfo
        ? (
          <span>
            {bairroInfo.ips}
            {' '}
            <span>IPS</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : activeBar === BAIRRO_DESCRIPTION_BAR ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={ipsIcon} alt="IPS" style={{ width: '20px', height: '20px' }} />
      )
    },
    {
      text: bairroInfo
        ? (
          <span>
            {bairroInfo.ranking_ips?.toLocaleString('pt-BR')}
            <span>° no rank IPS</span>
            {' '}
            <span style={{color: 'grey', fontSize: '12px', marginLeft:'8px' }}>em 2010</span>
          </span>
        )
        : activeBar === BAIRRO_DESCRIPTION_BAR ? <Loading /> : undefined,
      iconComponent: () => (
        <img src={rankIpsIcon} alt="rank ips" style={{ width: '20px', height: '20px' }} />
      )
    },


  ];

  const statusList = [

    // municipio
    {
      text: dadosAgregadosAbaSumarioStatusEntregasCidade?.concluida
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px", paddingRight:"10px" }}> Concluído </span> {dadosAgregadosAbaSumarioStatusEntregasCidade.concluida?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.concluida != 0) ? <Loading /> : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.concluida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Concluído </span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasCidade?.em_andamento
        ? (
          <span >
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento  </span>{dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento != 0) ? <Loading /> : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_andamento == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento </span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasCidade?.interrompida
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida </span> {dadosAgregadosAbaSumarioStatusEntregasCidade.interrompida?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.interrompida != 0) ? <Loading /> : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.interrompida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida </span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasCidade?.em_licitacao
        ? (
          <span >
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em licitação </span> {dadosAgregadosAbaSumarioStatusEntregasCidade.em_licitacao?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_licitacao != 0) ? <Loading /> : (activeBar === MAIN_UNDERSEARCH_BAR && dadosAgregadosAbaSumarioStatusEntregasCidade.em_licitacao == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em licitação </span> 0 obras
        </span> : undefined),
    },

    // subprefeitura
    {
      text: dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.concluida
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Concluído</span> {dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.concluida?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.concluida != 0) ? <Loading /> : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.concluida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Concluído</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.em_andamento
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento</span> {dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento != 0) ? <Loading /> : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_andamento == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.interrompida
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida</span>{dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.interrompida?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.interrompida != 0) ? <Loading /> : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.interrompida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasSubprefeitura?.em_licitacao
        ? (
          <span >
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em licitação</span> {dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_licitacao?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_licitacao != 0) ? <Loading /> : (activeBar === SUBPREFEITURA_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasSubprefeitura.em_licitacao == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em licitação</span> 0 obras
        </span> : undefined),
    },

    // bairro
    {
      text: dadosAgregadosAbaSumarioStatusEntregasBairro?.concluida
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Concluído</span> {dadosAgregadosAbaSumarioStatusEntregasBairro.concluida?.toLocaleString('pt-BR')} obras
          </span>

        )
        : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.concluida != 0) ? <Loading /> : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.concluida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Concluído</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasBairro?.em_andamento
        ? (
          <span >
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento</span> {dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento != 0) ? <Loading /> : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_andamento == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em andamento</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasBairro?.interrompida
        ? (
          <span >
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida</span> {dadosAgregadosAbaSumarioStatusEntregasBairro.interrompida?.toLocaleString('pt-BR')} obras
          </span>
        )
        : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.interrompida != 0) ? <Loading /> : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.interrompida == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Interrompida</span> 0 obras
        </span> : undefined),
    },
    {
      text: dadosAgregadosAbaSumarioStatusEntregasBairro?.em_licitacao
        ? (
          <span>
            <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}> Em licitação </span> {dadosAgregadosAbaSumarioStatusEntregasBairro.em_licitacao?.toLocaleString('pt-BR')} obras
          </span>

        )
        : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_licitacao != 0) ? <Loading /> : (activeBar === BAIRRO_DESCRIPTION_BAR && dadosAgregadosAbaSumarioStatusEntregasBairro.em_licitacao == 0 ? <span>
          <span style={{ color: '#007E7D', fontWeight: "bold", paddingRight:"10px" }}>Em licitação</span> 0 obras
        </span> : undefined),
    },

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
                      <item.iconComponent />
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
                  <item.iconComponent />
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

const mapStateToProps = (state) => {
  return {
    activeBar: state.active.activeBar, // Access imagesType from the Redux store
    // Other props you need from the Redux store
  };
};

export default connect(mapStateToProps)(ListInfoSumario);