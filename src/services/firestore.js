import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIRESTORE,
  authDomain: process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRESTORE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();

export const signInFireBase = async (email, password) => {
  try {
    let user = await auth.signInWithEmailAndPassword(email, password);

    if (user) {
      console.log(user);
      return user.user;
    }
  } catch (error) {
    return {error: error.message};
  }
};

export const signUpFireBase = async (email, password) => {
  try {
    let user = await auth.createUserWithEmailAndPassword(email, password);

    if (user) {
      console.log(user);
      return user.user;
    }
  } catch (error) {
    return {error: error.message};
  }
};

export const signOutFireBase = async () => {
  console.log("sgd");
  try {
    console.log(await auth.signOut());
    return true;
  } catch (error) {
    return false;
    return {error: error.message};
  }
};

export const getAllPosts = async () => {
  if (!db) return;
  const doc = await db.collection("posts").get();
  let res = [];
  doc.forEach((element) => {
    res.push({...element.data(), id: element.id});
  });
  return res;
};

export const createPost = async (post) => {
  if (!db) return;
  const res = await db.collection("posts").add(post);

  return res;
};

export const editPost = async (post, postId) => {
  if (!db) return;
  const of = await db.collection("posts").doc(postId);

  const res = await of.update(post);

  return res;
};

export const getOnePost = async (id) => {
  if (!db) return;

  const res = await db.collection("posts").doc(id).get();
  console.log(res.data());
  return {...res.data(), id: res.id};
};
