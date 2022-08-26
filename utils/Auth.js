import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getStartAndEndOfWeek } from './DateTimeHelpers/getDay';

const instantiateNewUser = async (id) => {
  let [startOfWeek, endOfWeek] = getStartAndEndOfWeek();
  startOfWeek.setHours(0, 0, 0, 0);
  let weekData = {
    startedAt: startOfWeek,
    weekOf: startOfWeek.toLocaleDateString(),
    expiresAt: Timestamp.fromDate(endOfWeek),
    weeklyActivities: [],
  };

  try {
    await setDoc(doc(db, id, 'activities'), weekData);
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

    await instantiateNewUser(user.uid);
    const token = user.stsTokenManager.accessToken;
    const uid = user.uid;
    return [token, uid];
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
      console.log('This is the error', error);
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
