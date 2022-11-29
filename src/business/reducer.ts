import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { ActionType, State } from "../types";
import { initialState } from "./initialState";

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
          console.log("loadedData", action.payload);

          const newState: State = {
            ...state,
            view: "projectBoard",
            phase: { type: "idle" },
            doEffect: null,
            data: action.payload,
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
