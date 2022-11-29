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

  switch (phase) {
    case "waitingDB": {
      switch (action.type) {
        case "loadedData": {
          console.log("loadedData", action.payload);

          const newState: State = { ...state, view: "projectBoard" };
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
