import {
  ORDER_CATEGORIA_LIST,
  SET_CATEGORIA_LIST,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from "../actions/actions";

const initialState = {
  categoriaList: [],
  loadingFlag: false,
};

const categoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIA_LIST:
      return {
        ...state,
        categoriaList: action.payload,
      };
    case ORDER_CATEGORIA_LIST:
      return {
        ...state,
        categoriaList: action.payload,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loadingFlag: action.payload,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loadingFlag: action.payload,
      };
    default:
      return state;
  }
};

export default categoriaReducer;
