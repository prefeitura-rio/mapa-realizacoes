import { db } from "../../firebase";

function toSnakeCase(str) {
  return str
      .trim()  // Remove espaços no início e fim da string
      .toLowerCase()  // Converte tudo para lowercase
      .replace(/\s+/g, '_');  // Substitui um ou mais espaços por underscore (_)
}


export async function obterSubprefeituraDoBairro(bairro) {
  try {
    const bairrosRef = db.collection("Bairros");
    const bairroDoc = await bairrosRef.doc(toSnakeCase(bairro)).get();

    if (bairroDoc.exists) {
      const idSubprefeitura = bairroDoc.data().id_subprefeitura;

      if (idSubprefeitura) {
        const subprefeiturasRef = db.collection("Subprefeituras");
        const subprefeituraDoc = await subprefeiturasRef.doc(idSubprefeitura).get();

        if (subprefeituraDoc.exists) {
          return subprefeituraDoc.data().nome;
        }
      }
    }

    return "Subprefeitura não encontrada";
  } catch (error) {
    console.error("Erro ao obter dados do Firebase:", error);
    return "Erro ao obter dados do Firebase";
  }
}