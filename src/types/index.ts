export type State = { view: ViewType; phase: PhaseType; doEffect: EffectType };

export type ViewType = "projectBoard" | "taskBoard" | "task";

//TODO: crud for project & task& etc.
export type PhaseType =
  | { type: "waitingDB" }
  | { type: "updatingDB" }
  | { type: "creatingProject" }
  | { type: "creatingTask" };

export type EffectType = { type: "!loadFireBase" } | null;

export type ActionType = { type: "loadedData"; payload: any };
