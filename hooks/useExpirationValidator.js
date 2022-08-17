import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getUsersExpiration } from '../db/readClockitData';

function useExpirationValidator(userId) {
  const [homeReady, setHomeReady] = useState(false);
  const weekOf = useRef(null);
  useEffect(() => {
    async function handleExpiration() {
      try {
        let getStartWeek = await getUsersExpiration(userId);
        weekOf.current = getStartWeek;
        setHomeReady(true);
      } catch (error) {}
    }
    handleExpiration();
  }, []);

  return [homeReady, weekOf];
}

export default useExpirationValidator;
