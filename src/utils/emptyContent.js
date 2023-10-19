import { firestore } from "../firebase";

export const emptyContent = {
  //header
  titulo: null,
  descricao: null,
  status: null,
  tema: [],

  //informações básicas
  programa: [],
  orgao: [],

  //total investido + cariocas atendidos
  totalInvestido: 0,
  cariocasAtendidos: 0,

  //data início + data fim

  imageUrl: null,
  coords: null,

};
