import App from "./App";
import { connect } from "react-redux";
import { useEffect } from "react"; // Importe o useEffect
import firebase from "firebase";
import "firebase/firestore";
// import bairros from "./inlines/converted_bairros2";
export const db = firebase.firestore();

const AppContainer = (props) => {
//   useEffect(() => {

//     // Referência à coleção 'realizacao' no Firestore.
// const db = firebase.firestore();

// // Função para criar um Geopoint a partir de latitude e longitude
// const criarGeopoint = (latitude, longitude) => {
//   return new firebase.firestore.GeoPoint(latitude, longitude);
// };

// // Função para adicionar realizações em massa
// const adicionarRealizacoesEmMassa = async () => {
//   try {
//     // Array de objetos representando várias realizações, com latitude e longitude
//     const realizacoes = [
//       {
//         id: "clinica_da_familia_rogerio_rocco",
//         cariocas_atendidos: 0,
//         data_fim: "2019-01-01",
//         data_inicio: "2020-01-01",
//         descricao: "Descrição da Realização",
//         id_bairro: "cosmos",
//         id_programa: "super_centro_carioca_de_saude",
//         id_status: "finalizada",
//         id_orgao:"sms",
//         id_subprefeitura:"subprefeitura_da_zona_oeste",
//         investimento: 0.0,
//         latitude: -22.123456, // Substitua com a latitude desejada
//         longitude: -43.987654, // Substitua com a longitude desejada
//         nome: "Clínica Da Família Rogério Rocco",
//       },
//       {
//         id: "hospital_da_mulher_mariska_ribeiro",
//         cariocas_atendidos: 0,
//         data_fim: "2017-01-01",
//         data_inicio: "2017-01-01",
//         descricao: "Descrição da Realização",
//         id_bairro: "bangu",
//         id_programa: "clinicas_da_familia",
//         id_status: "em_andamento",
//         id_orgao:"sms",
//         id_subprefeitura:"subprefeitura_da_zona_oeste",
//         investimento: 0.0,
//         latitude: -21.123456, // Substitua com a latitude desejada
//         longitude: -42.987654, // Substitua com a longitude desejada
//         nome: "Hospital Da Mulher Mariska Ribeiro",
//       },
//       {
//         id: "centro_municipal_de_saude_nilza_rosa",
//         cariocas_atendidos: 0,
//         data_fim: "2017-01-01",
//         data_inicio: "2020-01-01",
//         descricao: "Descrição da Realização",
//         id_bairro: "tijuca",
//         id_programa: "super_centro_carioca_de_saude",
//         id_status: "finalizada",
//         id_orgao:"sms",
//         id_subprefeitura:"subprefeitura_da_zona_norte",
//         investimento: 0.0,
//         latitude: -22.923456, // Substitua com a latitude desejada
//         longitude: -41.087654, // Substitua com a longitude desejada
//         nome: "Centro Municipal de Saúde Nilza Rosa",
//       },
      
//     ];

//     // Use um loop for/of para iterar pelo array de realizações
//     for (const realizacao of realizacoes) {
//       const { id, latitude, longitude, data_fim, data_inicio, ...dados } = realizacao;
//       dados.data_fim = firebase.firestore.Timestamp.fromDate(new Date(data_fim)); // Converter data_fim para timestamp
//       dados.data_inicio = firebase.firestore.Timestamp.fromDate(new Date(data_inicio)); // Converter data_inicio para timestamp
//       dados.localizacao = criarGeopoint(latitude, longitude); // Crie um campo 'localizacao' como Geopoint
//       await db.collection("Realizacoes").doc(id).set(dados);
//     }
//     console.log("Realizações adicionadas com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar realizações:", error);
//   }
// };

// // Chame a função para adicionar as realizações em massa
// adicionarRealizacoesEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE REALIZACOES
// //
// //

//
//
//                  INICIA INCLUSÃO EM MASSA DE BAIRROS
//
//

// Função para adicionar bairros em massa
// const adicionarBairrosEmMassa = async () => {
//   try {

//     // Use um loop for/of para iterar pelo array de bairros
//     for (const bairro of bairros) {
//       const { id_bairro, ...dados } = bairro;
//       await db.collection("Bairros").doc(id_bairro).set(dados);
//     }
//     console.log("Bairros adicionados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar bairros:", error);
//   }
// };

// Chame a função para adicionar os bairros em massa
// adicionarBairrosEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE BAIRROS
// //
// //

// //
// //
// //                  INICIA INCLUSÃO EM MASSA DE ORGAOS
// //
// //
// // Função para adicionar órgãos em massa
// const adicionarOrgaosEmMassa = async () => {
//   try {
//     // Array de objetos representando vários órgãos
//     const orgaos = [
//       {
//         nome: "Secretaria Municipal de Saúde",
//         sigla: "SMS",
//         id_orgao:"sms"
//       },
//       {
//         nome: "Gabinete do Prefeito",
//         sigla: "GBP",
//         id_orgao:"gbp"
//       },
//       {
//         nome: "Secretaria Municipal de Educação",
//         sigla: "SME",
//         id_orgao:"sme"
//       },
//       // Adicione mais objetos aqui para representar outros órgãos
//     ];

//     // Use um loop for/of para iterar pelo array de órgãos

//     for (const orgao of orgaos) {
//       const { id_orgao, ...dados } = orgao;
//       await db.collection("Orgaos").doc(id_orgao).set(dados);
//     }
//     console.log("Órgãos adicionados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar órgãos:", error);
//   }
// };

// // Chame a função para adicionar os órgãos em massa
// adicionarOrgaosEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE ORGAOS
// //
// //


// //
// //                  INICIA INCLUSÃO EM MASSA DE SUBPREFEITURAS
// //
// //
// // Função para adicionar subprefeituras em massa
// const adicionarSubprefeiturasEmMassa = async () => {
//   try {
//     // Array de objetos representando várias subprefeituras
//     const subprefeituras = [
//       {
//         id_cidade: "rio",
//         nome: "Subprefeitura da Zona Oeste",
//         id_subprefeitura: "subprefeitura_da_zona_oeste"
//       },
//       {
//         id_cidade: "rio",
//         nome: "Subprefeitura da Zona Sul",
//         id_subprefeitura: "subprefeitura_da_zona_sul"
//       },
//       {
//         id_cidade: "rio",
//         nome: "Subprefeitura da Zona Norte",
//         id_subprefeitura: "subprefeitura_da_zona_norte"
//       },
//       // Adicione mais objetos aqui para representar outras subprefeituras
//     ];

//     // Use um loop for/of para iterar pelo array de órgãos

//     for (const subprefeitura of subprefeituras) {
//       const { id_subprefeitura, ...dados } = subprefeitura;
//       await db.collection("Subprefeituras").doc(id_subprefeitura).set(dados);
//     }
//     console.log("Subprefeituras adicionados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar subprefeituras:", error);
//   }
// };

// // Chame a função para adicionar as subprefeituras em massa
// adicionarSubprefeiturasEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE SUBPREFEITURAS
// //
// //

// //
// //
// //                  INICIA INCLUSÃO EM MASSA DE PROGRAMAS
// //
// //
// // Função para adicionar órgãos em massa
// const adicionarProgramasEmMassa = async () => {
//   try {
//     // Array de objetos representando vários órgãos
//     const programas = [
//       {
//         descricao: "Descrição do Programa",
//         nome: "Super Centro Carioca de Saúde",
//         id_programa:"super_centro_carioca_de_saude"
//       },
//       {
//         descricao: "Descrição do Programa",
//         nome: "Clínicas da Família",
//         id_programa:"clinicas_da_familia"
//       },
//       {
//         descricao: "Descrição do Programa",
//         nome: "Morar Carioca",
//         id_programa:"morar_carioca"
//       },
//       // Adicione mais objetos aqui para representar outros programas
//     ];

//     // Use um loop for/of para iterar pelo array de órgãos

//     for (const programa of programas) {
//       const { id_programa, ...dados } = programa;
//       await db.collection("Programas").doc(id_programa).set(dados);
//     }
//     console.log("Programas adicionados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar programas:", error);
//   }
// };

// // Chame a função para adicionar os órgãos em massa
// adicionarProgramasEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE ORGAOS
// //
// //

// //
// //
// //                  INICIA INCLUSÃO EM MASSA DE SUBPREFEITURAS
// //
// //
// // Função para adicionar temas em massa
// const adicionarTemasEmMassa = async () => {
//   try {
//     // Array de objetos representando várias temas
//     const temas = [
//       {
//         nome: "Educacao",
//         id_tema: "educacao"
//       },
//       {
//         nome: "Saude",
//         id_tema: "saude"
//       },
//       {
//         nome: "Infraestrutura",
//         id_tema: "infraestrutura"
//       },
//       // Adicione mais objetos aqui para representar outras temas
//     ];

//     // Use um loop for/of para iterar pelo array de órgãos

//     for (const tema of temas) {
//       const { id_tema, ...dados } = tema;
//       await db.collection("Temas").doc(id_tema).set(dados);
//     }
//     console.log("Temas adicionados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao adicionar temas:", error);
//   }
// };

// adicionarTemasEmMassa();

// //
// //
// //                  FECHA INCLUSÃO EM MASSA DE SUBPREFEITURAS
// //
// //

// // -------------------------------------------------------------------------------
// const buscarRealizacaoPorID = async (idRealizacao) => {
//   try {
//     const realizacaoRef = db.collection("Realizacoes").doc(idRealizacao);
//     const snapshot = await realizacaoRef.get();

//     if (snapshot.exists) {
//       const realizacao = snapshot.data();
//       console.log("Realização encontrada:", realizacao);
//     } else {
//       console.log("Nenhuma realização encontrada com o ID:", idRealizacao);
//     }
//   } catch (error) {
//     console.error("Erro ao buscar realização:", error);
//   }
// };
// // Chame a função para buscar a realização pelo ID desejado
// buscarRealizacaoPorID("clinica_da_familia_rogerio_rocco");

// // -------------------------------------------------------------------------------
// const calcularInvestimentoTotalPorBairro = async (idBairro) => {
//   try {
//     const realizacoesRef = db.collection("Realizacoes");
//     const querySnapshot = await realizacoesRef.where("id_bairro", "==", idBairro).get();

//     let investimentoTotal = 0;

//     querySnapshot.forEach((doc) => {
//       const realizacao = doc.data();
//       investimentoTotal += realizacao.investimento;
//     });

//     console.log("Investimento total do bairro:", investimentoTotal);
//   } catch (error) {
//     console.error("Erro ao calcular o investimento total do bairro:", error);
//   }
// };

// // Chame a função para calcular o investimento total do bairro desejado
// calcularInvestimentoTotalPorBairro("cosmos");

// // Função para buscar todas as realizações de um bairro
// const buscarRealizacoesPorBairro = async (idBairro) => {
//   try {
//     const realizacoesRef = db.collection("Realizacoes");
//     const querySnapshot = await realizacoesRef.where("id_bairro", "==", idBairro).get();

//     const realizacoes = [];
//     querySnapshot.forEach((doc) => {
//       const realizacao = doc.data();
//       realizacoes.push(realizacao);
//     });

//     console.log("Realizações do bairro:", realizacoes);
//   } catch (error) {
//     console.error("Erro ao buscar realizações do bairro:", error);
//   }
// };
// // Chame a função para buscar as realizações do bairro desejado
// buscarRealizacoesPorBairro("cosmos");
// // -----------------------------------------------------------------------------------

// // Função para buscar informações de um bairro por ID
// const buscarInformacoesDeBairro = async (idBairro) => {
//   try {
//     const bairroRef = db.collection("Bairros").doc(idBairro);
//     const doc = await bairroRef.get();

//     if (doc.exists) {
//       const bairro = doc.data();
//       console.log("Informações do bairro:", bairro);
//     } else {
//       console.log("Nenhuma informação encontrada para o ID do bairro:", idBairro);
//     }
//   } catch (error) {
//     console.error("Erro ao buscar informações do bairro:", error);
//   }
// };

// // Chame a função para buscar informações do bairro desejado
// buscarInformacoesDeBairro("leblon");


// //--------------------------------------------------------------------------------------
//   }, []); // Passa um array vazio como segundo argumento para garantir que a consulta seja feita apenas uma vez quando o componente é montado.

  return <App />;
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
