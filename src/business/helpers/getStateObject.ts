import { LoadedDataType, ProjectListType, StateDataType } from "../../types";

export const getStateObject = (array: ProjectListType): any => {
  return array.reduce((result: any, projectItem: LoadedDataType) => {
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
