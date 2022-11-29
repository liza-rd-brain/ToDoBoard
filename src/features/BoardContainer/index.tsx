import { useDispatch, useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";

export const BoardContainer = () => {
  const { phase, data } = useSelector((state: State) => state);

  const boardHasCreatingForm = phase.type === "creatingProject";

  const projectList =
    data && Object.values(data); /* && Object.keys(data).length; */

  const getProjectList = (dataList: ProjectItemType[]) => {
    /**
     * sort by data,new to begin
     */
    const sortedDataList = dataList.sort((dataItemPrev, dataItemNext) => {
      const isBigger =
        dataItemNext.creationTimeStamp - dataItemPrev.creationTimeStamp;

      console.log(isBigger);
      return isBigger;
    });

    return sortedDataList.map((dataItem) => {
      return <ProjectCard key={dataItem.id} name={dataItem.name} />;
    });
  };

  return (
    <div className={style.projectList}>
      {boardHasCreatingForm ? <NewProject /> : null}
      {projectList ? getProjectList(projectList) : null}
    </div>
  );
};
