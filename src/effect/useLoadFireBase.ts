import { useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  getDocs,
  /*   doc,
  updateDoc,
  deleteDoc,
  orderBy,
  Timestamp,
  getFirestore,
  DocumentData, */
} from "firebase/firestore";

import { db, path } from "../firebase";
import { useAppDispatch } from "../business/reducer";
import { useSelector } from "react-redux";
import { NewProjectType, ProjectId, State, StateDataType } from "../types";
import { LoadedDataType } from "./useFireBase";

export function useLoadFireBase() {
  const dispatch = useAppDispatch();
  const [doEffect] = useSelector((state: State) => [state.doEffect]);

  useEffect(() => {
    switch (doEffect?.type) {
      // automatically pull data when bd update
      case "!loadFireBase": {
        //Load hole all bd

        const currQuery = query(collection(db, path));

        getDocs(currQuery).then((querySnapshot) => {
          const result = querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                value: doc.data(),
              } as LoadedDataType)
          );
          console.log(result);
          dispatch({ type: "loadedData", payload: result });
        });

        break;
      }

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
