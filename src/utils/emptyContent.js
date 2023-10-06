import { firestore } from "../firebase";

export const emptyContent = {
  //header
  titulo: "Adicionar título",
  descricao:"Adicionar descrição",
  status:[],
  tema:[],

  //informações básicas
  programa:[],
  orgao:[],
  // bairro:"-",
  // endereco:"Adicionar endereço",
  // subprefeitura:"-",

  //total investido + cariocas atendidos
  totalInvestido:"Adicionar total investido",
  cariocasAtendidos:"Adicionar total de cariocas atendidos",
  imageUrl: null,
  coords: null,
  //data início + data fim

};
