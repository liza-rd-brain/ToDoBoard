import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { ActionType, ColumnType, State, StateDataType } from "../types";
import { initialState } from "./initialState";
import { getStateObject } from "./helpers/getStateObject";
import { getColumnAfterDrag } from "./helpers/getColumnAfterDrag";

export const useAppDispatch = () => {
  const appDispatch = useDispatch<Dispatch<ActionType>>();
  return appDispatch;
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const phase = state.phase.type;

  console.log(state);

  switch (phase) {
    case "waitingDB": {
      switch (action.type) {
        case "loadedData": {
          const newProjectList = getStateObject(action.payload);
          // console.log("loadedData", action.payload);

          //TODO: получить view из query
          //TODO: view -не задаю кроме прелоадера!
          const newState: State = {
            ...state,
            view: null,
            // view: "projectBoard",
            phase: { type: "idle" },
            doEffect: null,
            projectList: newProjectList,
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }

    case "idle": {
      switch (action.type) {
        case "createProject": {
          const newState: State = {
            ...state,
            phase: { type: "creatingProject" },
          };
          return newState;
        }

        case "createTask": {
          const newState: State = {
            ...state,
            phase: { type: "creatingTask" },
            view: "task",
          };
          return newState;
        }

        case "openProject": {
          const newState: State = {
            ...state,
            view: "taskBoard",
            // currProjectId: action.payload,
          };
          return newState;
        }

        case "endedDrag": {
          // console.log("ended drag");
          // console.log(action.payload);

          const newColumn = getColumnAfterDrag(action.payload, state.column);

          const newState = {
            ...state,
            column: newColumn,
          };

          return newState;
        }

        case "startedSaveTask": {
          const newState: State = {
            ...state,
            doEffect: {
              type: "!createTask",
              data: action.payload,
            },
          };
          return newState;
        }

        case "endedCreateTask": {
          const newState: State = {
            ...state,
            doEffect: { type: "!loadFireBase" },
          };
          return newState;
        }

        default: {
          return state;
        }
      }
    }

    case "creatingProject": {
      switch (action.type) {
        case "startedSaveProject": {
          const newState: State = {
            ...state,
            doEffect: { type: "!saveProject", data: action.payload },
          };
          return newState;
        }

        case "endedSaveProject": {
          const newState: State = {
            ...state,
            phase: { type: "waitingDB" },
            doEffect: { type: "!loadFireBase" },
          };
          return newState;
        }
        case "revertNewProject": {
          const newState: State = {
            ...state,
            phase: { type: "idle" },
            doEffect: null,
          };
          return newState;
        }

        default: {
          return state;
        }
      }
    }

    case "creatingTask": {
      switch (action.type) {
        case "closeModal": {
          const newState: State = {
            ...state,
            phase: { type: "idle" },
            view: "taskBoard",
          };
          return newState;
        }

        case "startedSaveTask": {
          const newState: State = {
            ...state,
            doEffect: {
              type: "!createTask",
              data: action.payload,
            },
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
};
