// import {
//   REQUEST_ORGAOS_NAME,
//   REQUEST_ORGAOS_NAME_FAILED,
//   REQUEST_ORGAOS_NAME_SUCCESS,

//   SET_ORGAOS_NAME
// } from "./actions";

// const defaultState = {
//   selectedOrgaos: null,
//   selectedTemas: null,
//   selectedProgramas: null,
//   loading: false,
//   error: false
// };

// const filtrosReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case REQUEST_ORGAOS_NAME:
//       return {
//         ...state,
//         selectedOrgaos: null,
//         selectedTemas: null,
//         selectedProgramas: null,
//         loading: true,
//         error: false,
//       };
//     case REQUEST_ORGAOS_NAME_SUCCESS:
//       return {
//         ...state,
//         content: action.payload,
//         contentSnapshot: JSON.parse(JSON.stringify(action.payload)),
//         loading: false,
//         error: false,
//       };
//     case REQUEST_ORGAOS_NAME_FAILED:
//       return {
//         ...state,
//         content: null,
//         contentSnapshot: null,
//         loading: false,
//         error: true,
//       };
  
//     case SET_ORGAOS_NAME:
//       return {
//         ...state,
//         descriptionData: action.payload,
//       };
//   }
//   return state;
// };

// export default filtrosReducer;
