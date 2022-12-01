export type State = {
  view: ViewType;
  phase: PhaseType;
  doEffect: EffectType;
  projectList: StateDataType | null;
  column: ColumnType;
};

export type ColumnType = {
  tasks: TaskTypeTest;
  columns: ColumnsTypeTest;
  columnOrder: Array<string>;
};

export type TaskTypeTest = Record<string, TaskItemTypeTest>;

export type TaskItemTypeTest = {
  id: string;
  content: string;
};

export type ColumnsTypeTest = Record<string, ColumnItemTypeTest>;

export type ColumnItemTypeTest = {
  id: string;
  title: string;
  taskIds: Array<string>;
};

export type StateDataType = Record<ProjectId, ProjectItemType>;

export type ProjectId = string;

export type ProjectItemType = {
  id: ProjectId;
  name: string;
  creationTimeStamp: number;
  taskList: TaskItemType;
};

export type ViewType = ViewTypeList | null;

export const ViewList = [
  "preloader",
  "projectBoard",
  "taskBoard",
  "task",
] as const;

export type ViewTypeList = typeof ViewList[number];

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
  | { type: "!saveTask" }
  | { type: "!createTask"; data: TaskPayloadType }
  | null;

export type ActionType =
  //TODO: set payload type!
  | { type: "loadedData"; payload: any }
  | { type: "createProject" }
  | { type: "revertNewProject" }
  | { type: "createProject" }
  | { type: "createTask" }
  | { type: "startedSaveProject"; payload: NewProjectType }
  | { type: "endedSaveProject" }
  | { type: "endedDrag"; payload: any }
  | { type: "openProject"; payload: ProjectId }
  | { type: "closeModal" }
  | { type: "endedCreateTask" }
  | { type: "startedSaveTask"; payload: TaskPayloadType };

export type TaskPayloadType = {
  projectId: string;
  taskItem: {
    name: string;
  };
};

export type TaskItemType = any;

export type NewProjectType = { name: string; date: number };

export type HeaderType = "task" | "project";
