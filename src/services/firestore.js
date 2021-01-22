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

// let db;

// export const initizlize = () => {
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
// if (db) return true;
// };

export const getAllOffers = async () => {
  if (!db) return;
  const doc = await db.collection("offers").get();
  let res = [];
  doc.forEach((element) => {
    res.push({ ...element.data(), id: element.id });
  });
  return res;
};

export const createOffer = async (offer) => {
  if (!db) return;
  const res = await db.collection("offers").add(offer);

  return res;
};

export const editOffer = async (offer, offerId) => {
  if (!db) return;
  const of = db.collection("offers").doc(offerId);

  const res = await of.update(offer);

  return res;
};

export const getOneOffer = async (id) => {
  if (!db) return;

  const res = await db.collection("offers").doc(id).get();
  console.log(res.data());
  return { ...res.data(), id: res.id };
};
