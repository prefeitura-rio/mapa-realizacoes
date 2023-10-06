import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from 'react';


import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import PublicIcon from "@material-ui/icons/Public";
import CallIcon from "@material-ui/icons/Call";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import moment from "moment";

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

  const listInfo = [
  
    { text: content.programa, iconComponent: PublicIcon },
    { text: content.orgao, iconComponent: PublicIcon },
    { text: content.bairro, iconComponent: PublicIcon },
    { text: content.subprefeitura, iconComponent: PublicIcon},
    { text: "R$ " +  content.totalInvestido + " investidos", iconComponent: PublicIcon},
    { text: content.cariocasAtendidos + " cariocas atendidos", iconComponent: PublicIcon},
    { text: content.dataInicio + "início", iconComponent: PublicIcon},
    { text: content.dataFim + "fim", iconComponent: PublicIcon},
   
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
