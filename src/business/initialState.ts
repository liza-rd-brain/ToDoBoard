import { State } from "../types";

export const initialState: State = {
  view: "preloader",
  phase: { type: "waitingDB" },
  doEffect: { type: "!loadFireBase" },
};
