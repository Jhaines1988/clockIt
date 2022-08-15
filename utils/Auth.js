import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
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
    weekOf: startOfWeek.toLocaleDateString(),
    expiresAt: Timestamp.fromDate(endOfWeek),
    activities: [],
  };

  let firstWeekLabel = endOfWeek.toISOString();
  try {
    await setDoc(doc(db, id, 'currentWeek'), { expiresAt: endOfWeek, startedAt: startOfWeek });
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
      email: email,
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

const verifyUserEmail = async (userId) => {
  try {
    let verificationSuccess = await sendEmailVerification(auth.currentUser);
    if (verificationSuccess) {
      console.log('Email Sent to User!');
    }
  } catch (error) {
    console.log('Error Sending email...');
  }
};
export const login = async (email, password) => {
  try {
    console.log('does this Run? ', email, password);
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    // const expiryDate = getNextExpiryDate();
    console.log('userId', uid);

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
