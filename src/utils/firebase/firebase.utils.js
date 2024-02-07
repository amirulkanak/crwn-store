import { initializeApp } from "firebase/app";

// Authentication methods
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Database methods
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// config data from firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGSzT6UR0xN3z7Fec3RlETWOnr3_iD4Fo",
  authDomain: "crwn-store-db-334b9.firebaseapp.com",
  projectId: "crwn-store-db-334b9",
  storageBucket: "crwn-store-db-334b9.appspot.com",
  messagingSenderId: "217550523256",
  appId: "1:217550523256:web:fc2341a2c9894cd854568d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Selecting Authentication provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Google Authentication
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Database
export const db = getFirestore();

// creating user document with uid
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // if don't get userAuth then return
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  // getting user document
  const userSnapshot = await getDoc(userDocRef);

  // checking user data exists or not,if not creating new user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // write user data to db
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
    // if user exists return the data
    return userDocRef;
  }
};

// Sign Up : Native Authentication (email & password)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // if either of email and password if empty then return
  if (!email || !password) return;

  // if not then pass those
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In : Native Authentication (email & password)
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // if either of email and password if empty then return
  if (!email || !password) return;

  // if not then pass those
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
export const signOutUser = async () => await signOut(auth);

// Auth state change Listener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
