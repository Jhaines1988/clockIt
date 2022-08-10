import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import {
  findTheNextSunday,
  findDay,
  getNextExpiryDate,
  getStartAndEndOfWeek,
} from './DateTimeHelpers/getDay';
const instantiateNewUser = async (id) => {
  let [startOfWeek, endOfWeek] = getStartAndEndOfWeek();
  const expiryDate = endOfWeek.toISOString();
  let weekData = {
    weekOf: startOfWeek.toDateString() + '/' + endOfWeek.toDateString(),
    expiresAt: Timestamp.fromDate(endOfWeek),
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    activities: [],
  };

  let firstWeekLabel = endOfWeek.toISOString();
  try {
    // await setDoc(doc(db, id, 'activities'), docData);
    await setDoc(doc(db, id, 'activities'), weekData);
    await setDoc(doc(db, id, 'Previous Weeks', 'history', firstWeekLabel), {});
    return weekData.expiresAt.valueOf();
  } catch (error) {
    console.log(error, '<====');
  }
};

export const signUp = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      username: userName,
    });
    const expiryTime = await instantiateNewUser(user.uid);
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    return [token, uid, expiryTime];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('throw this error to signup screen', error);
    throw new Error({ message: errorMessage });
  }
};

export const login = async (email, password) => {
  try {
    console.log('does this Run? ');
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    const expiryDate = getNextExpiryDate();

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
