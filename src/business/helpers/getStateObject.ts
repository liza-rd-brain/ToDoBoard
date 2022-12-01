import { LoadedDataType, ProjectListType } from "../../effect/useFireBase";
import { StateDataType } from "../../types";

export const getStateObject = (array: ProjectListType): StateDataType => {
  return array.reduce((result: StateDataType, projectItem: LoadedDataType) => {
    return {
      ...result,
      [projectItem.id]: {
        id: projectItem.id,
        name: projectItem.value.projectData.name,
        creationTimeStamp: projectItem.value.projectData.date,
        taskList: null,
      },
    };
  }, {});
};
