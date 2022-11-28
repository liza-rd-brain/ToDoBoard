export type State = { view: ViewType; phase: PhaseType };

export type ViewType = "projectBoard" | "taskBoard" | "task";

//TODO: crud for project & task& etc.
export type PhaseType =
  | { type: "waitingDB" }
  | { type: "updatingDB" }
  | { type: "creatingProject" }
  | { type: "creatingTask" };
