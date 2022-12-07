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
import {
  LoadedDataType,
  NewProjectType,
  ProjectId,
  State,
  StateDataType,
  ViewTypeList,
} from "../types";

type EffectLoadType = { viewType: ViewTypeList; id?: string };

export function useLoadFireBase({ viewType, id: projectId }: EffectLoadType) {
  const dispatch = useAppDispatch();
  const [doEffect] = useSelector((state: State) => [state.doEffect]);

  useEffect(() => {
    switch (doEffect?.type) {
      // automatically pull data when bd update
      case "!loadFireBase": {
        switch (viewType) {
          case "projectBoard": {
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

          case "taskBoard": {
            if (projectId) {
              //projectIndex - index of project where task is
              const currQuery = query(
                collection(db, path, projectId, "taskList")
              );

              onSnapshot(currQuery, (querySnapshot) => {
                const taskList = querySnapshot.docs.map(
                  (doc) =>
                    ({
                      id: doc.id,
                      value: doc.data(),
                    } as LoadedDataType)
                );

                console.log("taskLIst", taskList);
              });
            }
            break;
          }
          default: {
            break;
          }
        }

        break;
      }

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
