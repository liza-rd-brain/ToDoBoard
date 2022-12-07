import { useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

import { db, path } from "../firebase";
import { useAppDispatch } from "../business/reducer";
import { useSelector } from "react-redux";
import {
  LoadedDataType,
  NewProjectType,
  ProjectId,
  State,
  StateDataType,
} from "../types";

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
        const currQuery = query(collection(db, path));

        onSnapshot(currQuery, (querySnapshot) => {
          const projectList = querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                value: doc.data(),
              } as LoadedDataType)
          );

          dispatch({ type: "loadedData", payload: projectList });
        });

        break;
      }

      case "!saveProject": {
        const data = doEffect.data;
        addDoc(collection(db, path), {
          projectData: data,
        })
          .then(() => {
            dispatch({ type: "endedSaveProject" });
          })
          .catch(() => console.error("error"));

        break;
      }

      //тестовый кейс, пример
      case "!saveTask": {
        const data = {
          projectID: "test123",
        };
        addDoc(collection(db, path, data.projectID, "taskList"), {
          projectData: data,
          /*   creationDate: Timestamp.now(), */
        })
          .then(() => {
            dispatch({ type: "endedSaveProject" });
          })
          .catch(() => console.error("error"));

        break;
      }

      case "!createTask": {
        const { projectId, taskItem } = doEffect.data;

        addDoc(collection(db, path, projectId, "taskList"), {
          taskData: taskItem,
        })
          .then(() => {
            dispatch({ type: "endedCreateTask" });
          })
          .catch(() => console.error("error"));
        break; /*  */
      }

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect /* requestType */]);
}
