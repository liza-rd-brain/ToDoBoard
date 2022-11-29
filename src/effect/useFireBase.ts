import { useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import { db, path } from "../firebase";
import { useAppDispatch } from "../business/reducer";
import { useSelector } from "react-redux";
import { State } from "../types";

/**
 * hook for interaction with firebase
 */
export function useFireBase() {
  const dispatch = useAppDispatch();
  const [doEffect] = useSelector((state: State) => [state.doEffect]);

  useEffect(() => {
    switch (doEffect?.type) {
      // automatically pull data when bd update
      case "!loadFireBase": {
        const currQuery = query(collection(db, path), orderBy("creationDate"));

        onSnapshot(currQuery, (querySnapshot) => {
          const todoList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            value: doc.data(),
          }));

          dispatch({ type: "loadedData", payload: todoList });
        });
        break;
      }

      default: {
        break;
      }
    }
  }, [doEffect]);
}
