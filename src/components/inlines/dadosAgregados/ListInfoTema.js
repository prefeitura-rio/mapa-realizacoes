// import {
//   List,
//   Divider,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   makeStyles,
//   Typography
// } from "@material-ui/core";
// import React from 'react';
// import cariocasAtendidosIcon from '../../../icons/cariocas_atendidos.png';
// import domiciliosIcon from '../../../icons/domicilios.png';
// import subprefeituraIcon from '../../../icons/subprefeitura.png';


// const useStyles = makeStyles((theme) => ({
//   root: {},
//   title: {
//     // margin: theme.spacing(2, 0), 
//     // fontSize: '1.5em' 
//     padding: "4px 24px 9px 24px",
//     // paddingLeft: "24px",
//     fontSize: "15px",
//     fontWeight: "bold"
//   },
//   marginZero: {
//     margin: 0,
//   },
//   listItemIcon: {
//     minWidth: "48px",
//   },
//   listItemGutters: {
//     paddingRight: "24px",
//     paddingLeft: "24px",
//   },
// }));

// const ListInfoTema = ({ content, showBasicInfo}) => {
//   const classes = useStyles();

//   const listInfoTema = [


//     { text: "216 " + "obras em andamento", iconComponent: () => <img src={subprefeituraIcon} alt="Subprefeitura" style={{ width: '20px', height: '20px' }} /> },
//     { text: "865.578 " + "domicílios" + "em 2010", iconComponent: () => <img src={domiciliosIcon} alt="Orgao" style={{ width: '20px', height: '20px' }} /> },
//     { text: "9999999" + " cariocas atendidos", iconComponent: () => <img src={cariocasAtendidosIcon} alt="Cariocas Atendidos" style={{ width: '20px', height: '20px' }} /> },

//   ];

//   const statusList = [
//     // Adicione os itens para sua nova lista aqui
//     { text: "Concluído " + "999 " + "obras" },
//     { text: "Em andamento " + "42 " + "obras" },
//     { text: "Interrompida " + "10 " + "obras" },
//     { text: "Em licitação " + "5 " + "obras" },

//   ];

//   return (
//     <>
//       {showBasicInfo && (
//       <Typography className={classes.title}>
//         Informações Básicas
//       </Typography>
// )}
//       <List>
//         {listInfoTema.map((item, i) => (
//           <React.Fragment key={i}>
//             {Array.isArray(item.text) ? (
//               item.text.map((textItem, j) => (
//                 <ListItem
//                   button
//                   classes={{ gutters: classes.listItemGutters }}
//                   key={textItem}
//                 >
//                   {j === 0 ? (
//                     <ListItemIcon classes={{ root: classes.listItemIcon }}>
//                       <item.iconComponent />
//                     </ListItemIcon>
//                   ) : (
//                     <ListItemIcon classes={{ root: classes.listItemIcon }}>
//                       {/* espaço vazio, mantém alinhamento mas sem ícone */}
//                     </ListItemIcon>
//                   )}
//                   <ListItemText
//                     primary={textItem}
//                     primaryTypographyProps={{ variant: 'body2' }}
//                     classes={{ root: classes.marginZero }}
//                   />
//                 </ListItem>
//               ))
//             ) : item.text ? (
//               <ListItem
//                 button
//                 classes={{ gutters: classes.listItemGutters }}
//                 key={item.text}
//               >
//                 <ListItemIcon classes={{ root: classes.listItemIcon }}>
//                   <item.iconComponent />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{ variant: 'body2' }}
//                   classes={{ root: classes.marginZero }}
//                 />
//               </ListItem>
//             ) : null}
//           </React.Fragment>
//         ))}

//       </List>

//     </>
//   );
// };
// export default ListInfoTema;
