import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
function useActivitiesSnapShot(addingActivities, setUsersCurrentActivities, userId) {
  let auth = getAuth();
  let id = auth.currentUser.uid;
  console.log(id, 'here');
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, id, 'activities'), (doc) => {
      console.log('!');
      setUsersCurrentActivities(doc.data().activities);
    });

    return () => {
      unsubscribe();
    };
  }, [addingActivities]);
}

export default useActivitiesSnapShot;
