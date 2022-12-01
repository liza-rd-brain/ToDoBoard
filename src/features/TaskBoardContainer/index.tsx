import { useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";
import Column from "../../component/Column";

export const TaskBoardContainer = () => {
  const { phase, projectList, column } = useSelector((state: State) => state);

  return (
    <div className={style.mainContainer}>
      {column.columnOrder.map((columnId: any) => {
        const currColumn = column.columns[columnId];
        const tasks = currColumn.taskIds.map(
          (taskId: any) => column.tasks[taskId]
        );

        return <Column key={currColumn.id} column={currColumn} tasks={tasks} />;
      })}
    </div>
  );
};
