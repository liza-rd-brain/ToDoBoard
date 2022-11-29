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
  getFirestore,
  DocumentData,
} from "firebase/firestore";

import { db, path } from "../firebase";
import { useAppDispatch } from "../business/reducer";
import { useSelector } from "react-redux";
import { ProjectId, State, StateDataType } from "../types";

/**
 * hook for interaction with firebase
 */

type LoadedValueType = { projectName: string };
type ProjectListType = Array<LoadedDataType>;

type LoadedDataType = { id: ProjectId; value: LoadedValueType };

const getStateObject = (array: ProjectListType): StateDataType => {
  return array.reduce((result: StateDataType, projectItem: LoadedDataType) => {
    return {
      ...result,
      [projectItem.id]: {
        id: projectItem.id,
        name: projectItem.value.projectName,
        taskList: null,
      },
    };
  }, {});
};

export function useFireBase() {
  const dispatch = useAppDispatch();
  const [doEffect] = useSelector((state: State) => [state.doEffect]);

  useEffect(() => {
    switch (doEffect?.type) {
      // automatically pull data when bd update
      case "!loadFireBase": {
        const currQuery = query(collection(db, path));

        onSnapshot(currQuery, (querySnapshot) => {
          console.log("querySnapshot", querySnapshot);

          const projectList = querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                value: doc.data(),
              } as LoadedDataType)
          );

          const stateDataObject = getStateObject(projectList);

          dispatch({ type: "loadedData", payload: stateDataObject });
        });

        break;
      }

      case "!saveProject": {
        const data = doEffect.data;
        addDoc(collection(db, path), { projectName: data })
          .then(() => {
            dispatch({ type: "endedSaveProject" });
          })
          .catch(() => console.error("error"));

        break;
      }

      default: {
        break;
      }
    }
  }, [doEffect]);
}
