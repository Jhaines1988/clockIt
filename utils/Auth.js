import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
// import { auth } from '../firebase';
const auth = getAuth();
export const signUp = async ({ email, password, userName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      username: userName,
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('HERE', errorCode, errorMessage);
  }

  // ...
};

export const login = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
