import { useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

export const ProjectBoardContainer = () => {
  const { phase, projectList } = useSelector((state: State) => state);

  const boardHasCreatingForm = phase.type === "creatingProject";

  const projectItemList =
    projectList &&
    Object.values(projectList); /* && Object.keys(data).length; */

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
      {projectItemList ? getProjectList(projectItemList) : null}
    </div>
  );
};
