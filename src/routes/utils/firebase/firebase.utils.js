import { initializeApp } from "firebase/app";

// Authentication methods
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Database methods
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Database
export const db = getFirestore();

// creating user document with uid
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // getting user document
  const userSnapshot = await getDoc(userDocRef);

  // checking user data exists or not,if not creating user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // write user data to db
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
    // if user exists return the data
    return userDocRef;
  }
};
