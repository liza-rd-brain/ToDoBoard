import { State } from "../types";

const initialColumn = {
  //TODO:EXAMPLE
  tasks: {
    taskFirst: { id: "taskFirst", content: "Take out the garbage" },
    taskSecond: { id: "taskSecond", content: "Watch my favorite show" },
    taskThird: { id: "taskThird", content: "Charge my phone" },
    taskFourth: { id: "taskFourth", content: "Cook dinner" },
  },
  columns: {
    queueColumn: {
      id: "queueColumn",
      title: "Queue",
      taskIds: ["taskFirst", "taskSecond", "taskThird", "taskFourth"],
    },
    developmentColumn: {
      id: "developmentColumn",
      title: "Development",
      taskIds: [],
    },
    doneColumn: {
      id: "doneColumn",
      title: "Done",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["queueColumn", "developmentColumn", "doneColumn"],
};

export const initialState: State = {
  view: "preloader",
  phase: { type: "waitingDB" },
  doEffect: { type: "!loadFireBase" },
  data: null,
  column: initialColumn,
};
