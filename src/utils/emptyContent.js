import { firestore } from "../firebase";

export const emptyContent = {
  //header
  titulo: "Adicionar título",
  descricao:"Adicionar descrição",
  status:"Adicionar status",
  tema:"Adicionar tema",

  //informações básicas
  programa:"Adicionar programa",
  orgao:"Adicionar órgao ",
  bairro:"-",
  // endereco:"Adicionar endereço",
  subprefeitura:"-",

  //total investido + cariocas atendidos
  totalInvestido:"Adicionar total investido",
  cariocasAtendidos:"Adicionar total de cariocas atendidos",

  //data início + data fim
  dataInicio:"Adicionar data de início",
  dataFim:"Adicionar data de término",



  endereco: "Adicionar Endereço",
  // lastVisit: firestore.Timestamp.fromDate(
  //   new Date("March 1, 2021 at 12:00:00 AM UTC+8")
  // ),
  // website: "Add website",
  // phoneNumber: "Add phone number",
  // ratingCount: 0,
  // ratingValue: 5,
  // inside: null,
  // type: 'Shopping mall',
  imageUrl: null,
  coords: null,
  // schedule: {
  //   monday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   tuesday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   wednesday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   thursday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   friday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   saturday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  //   sunday: {
  //     open: "8:00",
  //     close: "23:00",
  //     allDay: false,
  //     closed: false
  //   },
  // },
};
