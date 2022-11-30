export type State = {
  view: ViewType;
  phase: PhaseType;
  doEffect: EffectType;
  data: StateDataType | null;
  column: any;
};

export type StateDataType = Record<ProjectId, ProjectItemType>;

export type ProjectId = string;

export type ProjectItemType = {
  id: ProjectId;
  name: string;
  creationTimeStamp: number;
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
  | { type: "!saveProject"; data: NewProjectType }
  | null;

export type ActionType =
  //TODO: set payload type!
  | { type: "loadedData"; payload: any }
  | { type: "createProject" }
  | { type: "revertNewProject" }
  | { type: "createItem" }
  | { type: "startedSaveProject"; payload: NewProjectType }
  | { type: "endedSaveProject" }
  | { type: "endedDrag"; payload: any }
  | { type: "openProject"; payload: ProjectId };

export type TaskItemType = any;

export type NewProjectType = { name: string; date: number };
