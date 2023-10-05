function toSnakeCase(str) {
    return str
        .trim()  // Remove espaços no início e fim da string
        .toLowerCase()  // Converte tudo para lowercase
        .replace(/\s+/g, '_');  // Substitui um ou mais espaços por underscore (_)
  }
  
  function concatenaEmSnakeCase(string1, string2) {
    // Converte as duas strings para lower case
    const lowerCaseString1 = string1.toLowerCase();
    const lowerCaseString2 = string2.toLowerCase();
  
    // Substitui espaços por "" e concatena as strings
    const snakeCaseString1 = lowerCaseString1.replace(/\s+/g, '_');
    const snakeCaseString2 = lowerCaseString2.replace(/\s+/g, '_');
  
    // Concatena as duas strings com "__" no meio
    const resultado = `${snakeCaseString1}__${snakeCaseString2}`;
  
    return resultado;
  }
  
  function obterSiglaSecretaria(nomeSecretaria) {
    const siglasSecretarias = {
      "Controladoria Geral do Município": "CGM",
      "Gabinete do Prefeito": "GBP",
      "Procuradoria Geral do Município": "PGM",
      "Secretaria de Esportes": "SMEL",
      "Secretaria Especial da Juventude": "JUV-RIO",
      "Secretaria Especial de Ação Comunitária": "SEAC-RIO",
      "Secretaria Especial de Cidadania": "SECID",
      "Secretaria Especial de Integração Metropolitana": "SEIM",
      "Secretaria Especial de Políticas de Promoção da Mulher": "SPM-RIO",
      "Secretaria Especial de Turismo": "SETUR",
      "Secretaria Municipal de Desenvolvimento Econômico, Inovação e Simplificação": "SMDEIS",
      "Secretaria Municipal do Envelhecimento Saudável e Qualidade de Vida": "SEMESQV",
      "Secretaria Municipal da Pessoa com Deficiência": "SMPD",
      "Secretaria Municipal de Assistência Social": "SMAS",
      "Secretaria Municipal de Ciência e Tecnologia": "SMCT",
      "Secretaria Municipal de Conservação": "SECONSERVA",
      "Secretaria Municipal de Cultura": "SMC",
      "Secretaria Municipal de Educação": "SME",
      "Secretaria Municipal de Fazenda e Planejamento": "SMFP",
      "Secretaria Municipal de Governo e Integridade Pública": "SEGOVI",
      "Secretaria Municipal de Habitação": "SMH",
      "Secretaria Municipal de Infraestrutura": "SMI",
      "Secretaria Municipal do Ambiente e Clima": "SMAC",
      "Secretaria Municipal de Ordem Pública": "SEOP",
      "Secretaria Municipal de Planejamento Urbano": "SMPU",
      "Secretaria Municipal de Proteção e Defesa dos Animais": "SMPDA",
      "Secretaria Municipal de Saúde": "SMS",
      "Secretaria Municipal de Trabalho e Renda": "SMTE",
      "Secretaria Municipal de Transportes": "SMTR",
      "Companhia de Desenvolvimento Urbano da Região do Porto do Rio de Janeiro": "Cdurp",
      "Companhia Municipal de Energia e Iluminação": "Rioluz",
      "Companhia Municipal de Limpeza Urbana": "Comlurb",
      "Companhia de Engenharia de Tráfego": "CET-RIO",
      "Empresa Distribuidora de Filmes": "Riofilme",
      "Empresa Municipal de Artes Gráficas": "Imprensa Oficial",
      "Empresa Municipal de Informática": "IplanRio",
      "Empresa Municipal de Multimeios Ltda.": "MultiRio",
      "Empresa Municipal de Urbanização": "Riourbe",
      "Empresa de Turismo": "Riotur",
      "Rio Eventos": "RioEventos",
      "Instituto Municipal de Urbanismo Pereira Passos": "IPP",
      "Instituto de Previdência e Assistência do Município do Rio de Janeiro": "PREVI-RIO",
      "Guarda Municipal do Rio de Janeiro": "GM-Rio",
      "Fundação Planetário da Cidade do Rio de Janeiro": "PLANETÁRIO",
      "Fundação Parques e Jardins": "FPJ",
      "Fundação Jardim Zoológico da Cidade do Rio de Janeiro": "RIOZOO",
      "Fundação Instituto de Geotécnica do Município do Rio de Janeiro": "GEO-RIO",
      "Fundação Instituto Rio das Águas do Município do Rio de Janeiro": "RIO-ÁGUAS",
      "Fundação Cidade das Artes": "FCA"
    };
  
    // Verifica se o nome da secretaria existe no mapeamento
    if (siglasSecretarias.hasOwnProperty(nomeSecretaria)) {
      return siglasSecretarias[nomeSecretaria];
    } else {
      return "Sigla não encontrada";
    }
  }

  // Exporte as funções
export { toSnakeCase, concatenaEmSnakeCase, obterSiglaSecretaria };