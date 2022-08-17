import { onAuthStateChanged, getAuth } from 'firebase/auth';

// import { auth } from '../../firebase';

function authChange() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
}

export default authChange;
