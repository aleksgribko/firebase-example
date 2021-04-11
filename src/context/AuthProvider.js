import React, {useReducer, useEffect, useContext} from "react";
import {
  checkUserFireBase,
  signInFireBase,
  signUpFireBase,
  signOutFireBase,
} from "../services/firestore";
import {Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as firebase from "../services/firestore";

const password = process.env.REACT_APP_PASSWORD;

const Auth = React.createContext();

const initState = {
  isAuthorized: false,
  user: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return Object.assign({}, state, {
        ...state,
        isAuthorized: action.isAuthorized,
        user: action.user || state.user,
        loading: false,
      });
    case "SET_LOADING":
      return Object.assign({}, state, {
        ...state,
        loading: action.loading,
      });
    case "SET_ERROR":
      return Object.assign({}, state, {
        ...state,
        error: action.error,
        loading: false,
      });
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: true,
          user: {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
          },
        });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const handleCloseSnack = () => {
    console.log("here");
    dispatch({
      type: "SET_ERROR",
      error: null,
    });
  };

  const functions = {
    signIn: async (email, password) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      const user = await signInFireBase(email, password);
      console.log(user);
      if (user && !user.error) {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: true,
          user,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: user.error,
        });
      }
    },
    signUp: async (email, password) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      const user = await signUpFireBase(email, password);
      console.log(user);
      if (user && !user.error) {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: true,
          user,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: user.error,
        });
      }
    },
    logOut: async () => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      const res = await signOutFireBase();
      console.log(res);
      if (res && !res.error) {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: false,
          user: null,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "error",
        });
      }
    },
    setAuth: (pass, user) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
      if (pass === password) {
        dispatch({
          type: "SET_AUTH",
          isAuthorized: true,
          loading: false,
          user: user,
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
    setLoading: (data) => {
      dispatch({
        type: "SET_LOADING",
        loading: data,
      });
    },
  };

  console.log(state);

  return (
    <Auth.Provider
      value={{
        isAuthorized: state.isAuthorized,
        user: state.user,
        loading: state.loading,
        error: state.error,
        functions,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(state.error)}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={state.error}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
