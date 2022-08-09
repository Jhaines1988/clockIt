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
  // let id = 'Z20rA8EtLKfZ7PadJ7FcQjrfyFH3';
  /// need to call date helper funciton to determine when the next sunday is.
  let docData = {
    activities: [],
  };
  let today = findDay();
  let nextSunday = findTheNextSunday(today);
  const expiryDate = Timestamp.fromDate(nextSunday);
  let weekData = {
    expiresAt: expiryDate,
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  };
  let lastSunday = new Date(nextSunday);
  lastSunday.setDate(lastSunday.getDate() - 7);
  let firstWeekLabel = lastSunday.toISOString();
  try {
    await setDoc(doc(db, id, 'activities'), docData);
    await setDoc(doc(db, id, 'Week Data'), weekData);
    await setDoc(doc(db, id, 'Previous Weeks', 'history', firstWeekLabel), {});
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
    await instantiateNewUser(user.uid);
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
