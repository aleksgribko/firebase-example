import React, { useReducer, useContext, useMemo } from "react";
// import api from "../services/api";

const password = process.env.REACT_APP_PASSWORD;

const Auth = React.createContext();

const initiState = {
  isAuthorized: false,
  name: "Mate",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return Object.assign({}, state, {
        ...state,
        isAuthorized: action.isAuthorized,
        name: action.name || state.name,
        loading: false,
      });
    case "SET_LOADING":
      return Object.assign({}, state, {
        ...state,
        loading: action.loading,
      });
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initiState);

  const functions = useMemo(
    () => ({
      setAuth: (pass, name) => {
        dispatch({
          type: "SET_LOADING",
          loading: true,
        });
        if (pass === password) {
          dispatch({
            type: "SET_AUTH",
            isAuthorized: true,
            name: name,
          });
          return true;
        } else {
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          return false;
        }
      },
      logOut: () => {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: false,
          name: "Mate",
        });
      },
      setLoading: (data) => {
        dispatch({
          type: "SET_LOADING",
          loading: data,
        });
      },
    }),
    []
  );

  return (
    <Auth.Provider
      value={{
        isAuthorized: state.isAuthorized,
        name: state.name,
        loading: state.loading,
        functions,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
