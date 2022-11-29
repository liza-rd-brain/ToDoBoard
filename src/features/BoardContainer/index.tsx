import { useDispatch, useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";

export const BoardContainer = () => {
  const { phase, data } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const boardHasCreatingForm = phase.type === "creatingProject";

  const projectList =
    data && Object.values(data); /* && Object.keys(data).length; */

  const getProjectList = (dataList: ProjectItemType[]) => {
    return dataList.map((dataItem) => {
      return <ProjectCard key={dataItem.id} name={dataItem.name} />;
    });
  };

  const createProject = () => {
    dispatch({ type: "createProject" });
  };

  return (
    <div className={style.projectList}>
      <button className={style.button} onClick={createProject}>
        +
      </button>

      {projectList ? getProjectList(projectList) : null}
      {boardHasCreatingForm ? <NewProject /> : null}
      {/* Далее иконки проектов */}
    </div>
  );
};
