# Mapa de realizações - banco de dados

O banco de dados dessa aplicação está hospedado no Firestore Database, um banco de dados não relacional da Google. O modelo de dados é inspirado em um modelo relacional padrão e foi desenvolvido para atender as necessidades da aplicação.

## Modelo de dados

A seguir é descrito o modelo de dados. Todos os documentos possuem identificador _human-readable_, para facilitar a leitura e a manipulação dos dados.

### Coleção `bairro`

Campos:

- `domicilios`: número de domicílios do bairro.
- `geo`: GeoJSON do bairro.
- `habitantes`: número de habitantes do bairro.
- `id_subprefeitura`: identificador da subprefeitura a qual o bairro pertence.
- `ips`: Índice de Pobreza Social do bairro.
- `nome`: nome do bairro.
- `ranking_ips`: ranking do bairro em relação ao Índice de Pobreza Social.

#### Exemplo

- Documento `vila_valqueire`:

```json
{
  "domicilios": 0,
  "geo": "{ \"type\": \"Polygon\",... }",
  "habitantes": 0,
  "id_subprefeitura": "jacarepagua",
  "ips": 0.0,
  "nome": "Vila Valqueire",
  "ranking_ips": 0
}
```

### Coleção `cidade`

A coleção `cidade` contém os dados de cada uma das cidades cadastradas na aplicação. Cada documento dessa coleção possui os seguintes campos:

- `nome`: nome da cidade.

#### Exemplo

- Documento `rio`:

```json
{
  "nome": "Rio de Janeiro"
}
```

### Coleção `orgao`

Campos:

- `nome`: nome do órgão.
- `sigla`: sigla do órgão.

#### Exemplo

- Documento `sme`:

```json
{
  "nome": "Secretaria Municipal de Educação",
  "sigla": "SME"
}
```

### Coleção `programa`

Campos:

- `descricao`: descrição do programa.
- `nome`: nome do programa.

#### Exemplo

- Documento `programa_um`:

```json
{
  "descricao": "Descrição do Programa Um",
  "nome": "Programa Um"
}
```

### Coleção `realizacao`

Campos:

- `cariocas_atendidos`: número de cariocas atendidos pela realização.
- `data_fim`: data de fim da realização.
- `data_inicio`: data de início da realização.
- `descricao`: descrição da realização.
- `id_bairro`: identificador do bairro onde a realização ocorreu.
- `id_programa`: identificador do programa ao qual a realização pertence.
- `id_status`: identificador do status da realização.
- `investimento`: investimento da realização.
- `latitude`: latitude da realização.
- `longitude`: longitude da realização.
- `nome`: nome da realização.

#### Exemplo

- Documento `realizacao_um`:

```json
{
  "cariocas_atendidos": 0,
  "data_fim": "2019-01-01",
  "data_inicio": "2019-01-01",
  "descricao": "Descrição da Realização Um",
  "id_bairro": "vila_valqueire",
  "id_status": "finalizada",
  "image_url": "",
  "investimento": 0.0,
  "latitude": 0.0,
  "longitude": 0.0,
  "nome": "Realização Um"
}
```

### Coleção `realizacao_orgao`

Essa coleção é utilizada para fazer a relação muitos-para-muitos entre as coleções `realizacao` e `orgao`. O nome dos documentos dessa coleção é composto pelo identificador da realização e do órgão, separados por dois underscores (`__`). Cada documento dessa coleção possui os seguintes campos:

- `id_orgao`: identificador do órgão.
- `id_realizacao`: identificador da realização.

#### Exemplo

- Documento `realizacao_um__sme`:

```json
{
  "id_orgao": "sme",
  "id_realizacao": "realizacao_um"
}
```

### Coleção `realizacao_tema`

Essa coleção é utilizada para fazer a relação muitos-para-muitos entre as coleções `realizacao` e `tema`. O nome dos documentos dessa coleção é composto pelo identificador da realização e do tema, separados por dois underscores (`__`). Cada documento dessa coleção possui os seguintes campos:

- `id_realizacao`: identificador da realização.
- `id_tema`: identificador do tema.

#### Exemplo

- Documento `realizacao_um__educacao`:

```json
{
  "id_realizacao": "realizacao_um",
  "id_tema": "educacao"
}
```

### Coleção `status`

Campos:

- `nome`: nome do status.

#### Exemplo

- Documento `finalizada`:

```json
{
  "nome": "Finalizada"
}
```

### Coleção `subprefeitura`

Campos:

- `id_cidade`: identificador da cidade a qual a subprefeitura pertence.
- `nome`: nome da subprefeitura.

#### Exemplo

- Documento `jacarepagua`:

```json
{
  "id_cidade": "rio",
  "nome": "Jacarepaguá"
}
```

### Coleção `tema`

Campos:

- `descricao`: descrição do tema.
- `nome`: nome do tema.

#### Exemplo

- Documento `educacao`:

```json
{
  "nome": "Educação"
}
```

## Como utilizar

### Como adicionar uma nova realização

Para adicionar uma nova realização, basta adicionar um novo documento na coleção `realizacao`. O identificador do documento deve ser um identificador _human-readable_. Você deve se atentar aos IDs que fazem referência a outras coleções, como `id_bairro`, `id_programa` e `id_status`. Esses IDs devem ser os mesmos IDs utilizados nos documentos das coleções correspondentes. Caso você queira adicionar uma nova realização que faça referência a um bairro, programa ou status que ainda não exista, você deve adicioná-lo antes de adicionar a realização.

Também, para o caso dos temas e órgãos, você deve adicionar um documento na coleção `realizacao_tema` ou `realizacao_orgao`, respectivamente, para fazer a relação muitos-para-muitos entre a realização e o tema/órgão. O nome do documento deve ser composto pelo identificador da realização e do tema/órgão, separados por dois underscores (`__`). O documento deve possuir os campos `id_realizacao` e `id_tema` ou `id_orgao`, respectivamente.

Exemplo em código:

```javascript
// Adicionando uma nova realização
db.collection("realizacao").doc("realizacao_dois").set({
  cariocas_atendidos: 0,
  data_fim: "2019-01-01",
  data_inicio: "2019-01-01",
  descricao: "Descrição da Realização Dois",
  id_bairro: "vila_valqueire",
  id_programa: "programa_um",
  id_status: "finalizada",
  investimento: 0.0,
  latitude: 0.0,
  longitude: 0.0,
  nome: "Realização Dois",
});
// Adicionando a relação muitos-para-muitos entre a realização e o tema
db.collection("realizacao_tema").doc("realizacao_dois__educacao").set({
  id_realizacao: "realizacao_dois",
  id_tema: "educacao",
});
// Adicionando a relação muitos-para-muitos entre a realização e o órgão
db.collection("realizacao_orgao").doc("realizacao_dois__sme").set({
  id_realizacao: "realizacao_dois",
  id_orgao: "sme",
});
```

### Como buscar realizações

Você pode querer chegar a um conjunto de realizações filtrando de diversas formas. Abaixo são descritas algumas formas de filtrar as realizações.

#### Filtrando por bairro

```javascript
db.collection("realizacao")
  .where("id_bairro", "==", "vila_valqueire")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });
```

#### Filtrando por programa

```javascript
db.collection("realizacao")
  .where("id_programa", "==", "programa_um")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });
```

#### Filtrando por tema

```javascript
// Get the IDs of the realizations that have the theme "educacao"
db.collection("realizacao_tema")
  .where("id_tema", "==", "educacao")
  .get()
  .then((querySnapshot) => {
    let realizacoes = [];
    querySnapshot.forEach((doc) => {
      realizacoes.push(doc.data().id_realizacao);
    });
    // Get the realizations that have the IDs obtained above
    db.collection("realizacao")
      .where(firebase.firestore.FieldPath.documentId(), "in", realizacoes)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
  });
```

#### Filtrando por subprefeitura

```javascript
db.collection("bairro")
  .where("id_subprefeitura", "==", "jacarepagua")
  .get()
  .then((querySnapshot) => {
    let bairros = [];
    querySnapshot.forEach((doc) => {
      bairros.push(doc.id);
    });
    db.collection("realizacao")
      .where("id_bairro", "in", bairros)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
  });
```

#### Filtrando por órgão

```javascript
// Get the IDs of the realizations that have the organ "sme"
db.collection("realizacao_orgao")
  .where("id_orgao", "==", "sme")
  .get()
  .then((querySnapshot) => {
    let realizacoes = [];
    querySnapshot.forEach((doc) => {
      realizacoes.push(doc.data().id_realizacao);
    });
    // Get the realizations that have the IDs obtained above
    db.collection("realizacao")
      .where(firebase.firestore.FieldPath.documentId(), "in", realizacoes)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
  });
```

#### Filtrando por tema e subprefeitura

```javascript
// Get the IDs of the realizations that have the theme "educacao"
db.collection("realizacao_tema")
  .where("id_tema", "==", "educacao")
  .get()
  .then((querySnapshot) => {
    let realizacoes = [];
    querySnapshot.forEach((doc) => {
      realizacoes.push(doc.data().id_realizacao);
    });
    // Get the realizations that have the IDs obtained above
    db.collection("realizacao")
      .where(firebase.firestore.FieldPath.documentId(), "in", realizacoes)
      .get()
      .then((querySnapshot) => {
        let bairros = [];
        querySnapshot.forEach((doc) => {
          bairros.push(doc.data().id_bairro);
        });
        db.collection("bairro")
          .where("id_subprefeitura", "==", "jacarepagua")
          .where(firebase.firestore.FieldPath.documentId(), "in", bairros)
          .get()
          .then((querySnapshot) => {
            let bairros = [];
            querySnapshot.forEach((doc) => {
              bairros.push(doc.id);
            });
            db.collection("realizacao")
              .where("id_bairro", "in", bairros)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());
                });
              });
          });
      });
  });
```
