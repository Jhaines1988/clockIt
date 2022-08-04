import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const signUp = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      username: userName,
    });
    await setDoc(doc(db, user.uid, 'activities'), {
      userActivities: [{ activity: 'sampleActivity', id: '1244556' }],
    });
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    return [token, uid];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('throw this error to signup screen');
    throw new Error({ message: errorMessage });
  }
};

export const login = async (email, password) => {
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    return [token, uid];
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      throw new Error(`Looks like you've got the wrong password...`);
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('Email not found, please signup');
    } else {
      throw new Error(error);
    }
  }
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const expirationTime = user.stsTokenManager.expirationTime;
      let token = user.stsTokenManager.accessToken;
      console.log(expirationTime);
      callback({ isLoggedIn: true });
      // ...
    } else {
      // User is signed out
      callback({ isLoggedIn: false });
      // ...
    }
  });
};
