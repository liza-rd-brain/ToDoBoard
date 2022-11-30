import { State } from "../types";

const initialColumn = {
  tasks: {
    taskFirst: { id: "taskFirst", content: "Take out the garbage" },
    taskSecond: { id: "taskSecond", content: "Watch my favorite show" },
    taskThird: { id: "taskThird", content: "Charge my phone" },
    taskFourth: { id: "taskFourth", content: "Cook dinner" },
  },
  columns: {
    columnFirst: {
      id: "columnFirst",
      title: "To do",
      taskIds: ["taskFirst", "taskSecond", "taskThird", "taskFourth"],
    },
    columnSecond: {
      id: "columnSecond",
      title: "In progress",
      taskIds: [],
    },
    columnThird: {
      id: "columnThird",
      title: "Done",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["columnFirst", "columnSecond", "columnThird"],
};

export const initialState: State = {
  view: "preloader",
  phase: { type: "waitingDB" },
  doEffect: { type: "!loadFireBase" },
  data: null,
  column: initialColumn,
};
