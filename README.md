# Mapa de realizações da prefeitura. <br> Inspirado no Google Maps &copy;
Projeto fullstack criado com:
- React
- Redux
- Redux Saga
- Leaflet 
- Firebase (backend da aplicação)
<br/><br/>

## Redux / Redux-Saga
Este projeto utiliza Redux e Redux-Saga para gerenciar o estado da aplicação e efeitos colaterais assíncronos. A estrutura de diretórios do Redux segue uma abordagem modularizada, onde diferentes recursos (como autenticação, comentários, imagens, lugares, etc.) têm suas próprias subpastas.
### Estrutura de Pasta

  /redux  <br>
  |-- /auth <br>
  |   |-- actions.js  <br>
  |   |-- reducers.js  <br>
  |-- /comments  <br>
  |-- /images  <br>
  |-- /places  <br>
  |-- ...  <br>
  .   ...  <br>
  .   ...  <br>
  .   ... <br>
  |-- reducers.js <br>
  |-- sagas.js <br>
  |-- store.js <br>

Cada subpasta contém dois arquivos principais:

**actions.js** - Define as ações que podem ser despachadas. <br>
**reducers.js** - Define como o estado muda em resposta a uma ação. <br>
Além disso, temos três arquivos na raiz do diretório Redux: <br>

**reducers.js** - Combina todos os reducers em um. <br>
**sagas.js**- Define sagas para lidar com efeitos colaterais assíncronos.<br>
**store.js** - Configura e cria a Redux Store.<br>

Exemplo: Autenticação (auth)
**actions.js**
````
Aqui definimos várias ações relacionadas à autenticação
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
````
**reducers.js**
```
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "./actions";
...

```
### Redux-Saga
O Redux-Saga é utilizado para efeitos colaterais assíncronos, como chamadas API.

**sagas.js**
Este arquivo contém várias sagas que lidam com diferentes aspectos da aplicação. Por exemplo, para a autenticação, temos:

```
async function loginFirebase() {
  // ... (código para autenticação)
}

function* workerLogin() {
  try {
    yield put(loginRequest());
    const data = yield call(loginFirebase);
    yield put(loginSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(loginFail());
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN, workerLogin);
}

```
### Como rodar Saga
No arquivo store.js, o middleware do saga é aplicado e a saga raiz é executada.
```
const sagaMiddleware = createSagaMiddleware();
// ...
sagaMiddleware.run(rootSaga);

```
## Configuração do ambiente

- Baixe este repositório como um arquivo ZIP usando o botão acima e descompacte-o. Se você estiver usando `git`, clone este repositório.
- Instale as dependências listadas no arquivo `package.json`:

```
npm install
```

- Para rodar o ambiente de desenvolvimento:

```
npm start
```


#### Instalação e dependências

Este aplicativo foi construído e testado usando

- Node version v14.17.6
- NPM version 6.14.15

#### ⚠ Credenciais do firebase - firebase.js ⚠
```
As credenciais do firebase estão no arquivo firebaseconfig.js.

Esse arquivo não se encontra neste repositório. Este arquivo é
de uso exclusivo dos desenvolvedores do escritório de dados.
```
  
## Screenshots:
### Fullwidth:
![image](./images/132619257-a49f59b9-b3f8-47f6-8dbe-9764a462bc20%20(1).png)<br/><br/>
![image](./images/132619403-e89792fc-a11e-4123-8101-543404c5de29%20(1).png)
### Mobile:
![image](./images/gmc-screen1.jpg)
![image](./images/gmc-screen2.jpg)
