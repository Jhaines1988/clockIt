import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { HistoryContext } from '../store/History-Context';

const useFetchHistory = (userId, activityId) => {
  const historyCtx = useContext(HistoryContext);
  const [isLoading, setIsLoading] = useState(true);
  const lastVisible = useRef(null);

  useEffect(() => {
    async function getHistory() {
      try {
        const q = query(
          collection(db, userId, 'History', activityId.toString()),
          orderBy('startedAt', 'desc'),
          limit(8)
        );
        const history = await getDocs(q);
        lastVisible.current = history.docs[history.docs.length - 1];

        const fetchedHistory = [];
        history.forEach((doc) => {
          fetchedHistory.push(doc.data());
        });

        historyCtx.dispatch({
          type: 'POPULATE',
          payload: { fetchedData: fetchedHistory, id: activityId },
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error, 'here');
      }
    }

    if (!historyCtx.history[activityId].history.length) {
      getHistory();
    } else {
      setIsLoading(false);
    }

    return () => {
      // lastVisible.current = null;
    };
  }, []);

  return [isLoading, lastVisible];
};

export default useFetchHistory;
