import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const signUp = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      username: userName,
    });
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
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Throw this error to LoginScreen');
    throw new Error({ message: errorMessage });
  }
};
