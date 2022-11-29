export type State = {
  view: ViewType;
  phase: PhaseType;
  doEffect: EffectType;
  data: StateDataType | null;
};

export type StateDataType = Record<ProjectId, ProjectItemType>;

export type ProjectId = string;

export type ProjectItemType = {
  id: ProjectId;
  name: string;
  taskList: TaskItemType;
};

export type ViewType = "preloader" | "projectBoard" | "taskBoard" | "task";

//TODO: crud for project & task& etc.
export type PhaseType =
  | { type: "idle" }
  | { type: "waitingDB" }
  | { type: "updatingDB" }
  | { type: "creatingProject" }
  | { type: "creatingTask" };

export type EffectType =
  | { type: "!loadFireBase" }
  | { type: "!saveProject"; data: string }
  | null;

export type ActionType =
  //TODO: set payload type!
  | { type: "loadedData"; payload: any }
  | { type: "createProject" }
  | { type: "createItem" }
  | { type: "startedSaveProject"; payload: string }
  | { type: "endedSaveProject" };

export type TaskItemType = any;
