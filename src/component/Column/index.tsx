import React, { FC } from "react";

import { Droppable } from "react-beautiful-dnd";
import { TaskPreview } from "../TaskPreview";

import style from "./index.module.scss";

const Column: FC<{ column: any; tasks: any }> = ({ column, tasks }) => {
  return (
    <div className={style.columnContainer}>
      <div className={style.titleColumn}>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={style.taskListColumn}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task: any, index: any) => (
              <TaskPreview key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
