import { useDispatch, useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";
import { Link } from "react-router-dom";

export const BoardContainer = () => {
  const { phase, data, currProjectId } = useSelector((state: State) => state);

  const boardHasCreatingForm = phase.type === "creatingProject";

  const projectList =
    data && Object.values(data); /* && Object.keys(data).length; */

  const getProjectList = (dataList: ProjectItemType[]) => {
    /**
     * sort by data,new to begin
     */
    const sortedDataList = dataList.sort((dataItemPrev, dataItemNext) => {
      return dataItemNext.creationTimeStamp - dataItemPrev.creationTimeStamp;
    });

    return sortedDataList.map((dataItem) => {
      return (
        <Link key={dataItem.id} to={`/project/${dataItem.id}`}>
          <ProjectCard
            key={dataItem.id}
            name={dataItem.name}
            id={dataItem.id}
          />
        </Link>
      );
    });
  };

  return (
    <div className={style.projectList}>
      {boardHasCreatingForm ? <NewProject /> : null}
      {projectList ? getProjectList(projectList) : null}
    </div>
  );
};
