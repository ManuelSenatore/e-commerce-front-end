export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const SET_PRODOTTO_LIST = "SET_PRODOTTO_LIST";
export const SET_PREFERITI_LIST = "SET_PREFERITI_LIST";
export const SET_CARRELLO_LIST = "SET_CARRELLO_LIST";
export const SET_CATEGORIA_LIST = "SET_CATEGORIA_LIST";
export const ORDER_CATEGORIA_LIST = "ORDER_CATEGORIA_LIST";
export const SET_ORDER_LIST = "SET_ORDER_LIST";
export const REMOVE_TO_ORDER = "REMOVE_TO_ORDER";
export const SET_LOGIN_FLAG_TRUE = "SET_LOGIN_FLAG_TRUE";
export const SET_LOGIN_FLAG_FALSE = "SET_LOGIN_FLAG_FALSE";
export const SET_LOADING_TRUE = "SET_LOADING_TRUE";
export const SET_LOADING_FALSE = "SET_LOADING_FALSE";

export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE,
  payload: true
})

export const setLoadingFalse = () => ({
  type: SET_LOADING_FALSE,
  payload: false
})

export const setLoginFlagTrue = () => ({
  type: SET_LOGIN_FLAG_TRUE,
  payload: true
})

export const setLoginFlagFalse = () => ({
  type: SET_LOGIN_FLAG_FALSE,
  payload: false
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logout = () => ({
  type: LOG_OUT,
});

export const setProdottoList = (prodottoList) => ({
  type: SET_PRODOTTO_LIST,
  payload: prodottoList,
});

export const setPreferitiList = (preferitiList) => ({
  type: SET_PREFERITI_LIST,
  payload: preferitiList
})

export const setCarrelloList = (carrelloList) => ({
  type: SET_CARRELLO_LIST,
  payload: carrelloList
})

export const setCategoriaList = (categoriaList) => ({
  type: SET_CATEGORIA_LIST,
  payload: categoriaList
})

export const orderCategoriaList = (categoriaList) => ({
  type: ORDER_CATEGORIA_LIST,
  payload: categoriaList
})

export const setOrderList = (data) => ({
  type: SET_ORDER_LIST,
  payload: data
})

export const removeOrder = (i) => ({
  type: REMOVE_TO_ORDER,
  payload: i
})

export const logIn = (obj) => {
  const baseEndpoint = "http://localhost:8080/auth/login";

  const header = {
    "Content-type": "application/json",
  };

  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        dispatch(setLoginFlagFalse())
      } else {
        dispatch(setLoginFlagTrue())
        console.log("username o password errata");
      } 
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProdottoList = () => {
  const baseEndpoint = "http://localhost:8080/api/prodotti";

  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setProdottoList(data));
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPreferitiList = (key, id) => {
  const baseEndpoint = `http://localhost:8080/api/preferiti/${id}`;
  const header = {
      Authorization : `Bearer ${ key }` ,
  };
  return async (dispatch , getState) => {
      try {
          const response = await fetch ( baseEndpoint , {
              method : "GET" ,
              headers : header ,
          } );
          if ( response.ok ) {
              const data = await response.json ();
              dispatch(setPreferitiList(data))
          } else {
              console.log ( "Error fetching results" );
          }
      } catch ( error ) {
          console.log ( error );
      }
  };
};

export const getCarrelloList = (key, id) => {
  const baseEndpoint = `http://localhost:8080/api/carrello/${id}`;
  const header = {
      Authorization : `Bearer ${ key }` ,
  };
  return async (dispatch , getState) => {
      try {
          const response = await fetch ( baseEndpoint , {
              method : "GET" ,
              headers : header ,
          } );
          if ( response.ok ) {
              const data = await response.json ();
              dispatch(setCarrelloList(data))
          } else {
              console.log ( "Error fetching results" );
          }
      } catch ( error ) {
          console.log ( error );
      }
  };
};

export const getCategoriaList = (categoria) => {
  const baseEndpoint = `http://localhost:8080/api/prodotti/categoria/${categoria}`;
  return async (dispatch ) => {
      try {
          const response = await fetch ( baseEndpoint , {
              method : "GET" ,
          } );
          if ( response.ok ) {
              const data = await response.json ();
              dispatch(setCategoriaList(data))
          } else {
              console.log ( "Error fetching results" );
          }
      } catch ( error ) {
          console.log ( error );
      }
  };
};

export const orderingCategoriaList = (categoria, value) => {
  const baseEndpoint = `http://localhost:8080/api/prodotti/categoria/${categoria}/${value}`;
  return async (dispatch ) => {
      try {
          dispatch(setLoadingTrue())
          const response = await fetch ( baseEndpoint , {
              method : "GET" ,
          } );
          if ( response.ok ) {
              const data = await response.json ();
              dispatch(orderCategoriaList(data))
              dispatch(setLoadingFalse())
          } else {
              console.log ( "Error fetching results" );
          }
      } catch ( error ) {
          console.log ( error );
      }
  };
};