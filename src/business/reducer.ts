import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { ActionType, State } from "../types";
import { initialState } from "./initialState";

export const useAppDispatch = () => {
  const appDispatch = useDispatch<Dispatch<ActionType>>();
  return appDispatch;
};

const checkResult = (result: any, state: State): State => {
  const { destination, source, draggableId } = result;
  const { column } = state;

  if (!destination) {
    return state;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return state;
  }

  const start = column.columns[source.droppableId];
  const finish = column.columns[destination.droppableId];

  if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state.column,
      columns: {
        ...column.columns,
        [newColumn.id]: newColumn,
      },
    };

    return newState;
  } else {
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      column: {
        ...state.column,
        columns: {
          ...state.column.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      },
    };

    return newState;
  }
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const phase = state.phase.type;
  const view = state.view;

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
        case "createItem": {
          switch (view) {
            case "projectBoard": {
              const newState: State = {
                ...state,
                phase: { type: "creatingProject" },
              };
              return newState;
            }
            case "taskBoard": {
              const newState: State = {
                ...state,
                phase: { type: "creatingTask" },
                view: "task",
              };
              return newState;
            }
            default: {
              return state;
            }
          }
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
          console.log("ended drag");
          console.log(action.payload);

          const newColumn = checkResult(action.payload, state);

          console.log("newColumn", newColumn);
          return newColumn;
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
