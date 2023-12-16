function toSnakeCase(str) {
  // Converts a string from "Title Case" to "snake_case"
  return str
    .trim() // Remove espaços no início e fim da string
    .toLowerCase() // Converte tudo para lowercase
    .replace(/\s+/g, "_"); // Substitui um ou mais espaços por underscore (_)
}
function snakeToCapitalized(str) {
  return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

function toTitleCase(str) {
  // Converts a string from "snake_case" to "Title Case"
  return str
    .trim() // Remove espaços no início e fim da string
    .replace(/_/g, " ") // Substitui underscore (_) por espaço
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())); // Converte a primeira letra de cada palavra para maiúscula
}

function concatSnakeCase(string1, string2) {
  // Transforma as strings em snake_case
  const snakeCaseString1 = toSnakeCase(string1);
  const snakeCaseString2 = toSnakeCase(string2);

  // Concatena as duas strings com "__" no meio
  const resultado = `${snakeCaseString1}__${snakeCaseString2}`;

  return resultado;
}


// Exporte as funções
export { toSnakeCase, toTitleCase, concatSnakeCase, snakeToCapitalized };
