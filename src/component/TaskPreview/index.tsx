import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import style from "./index.module.scss";

export const TaskPreview: FC<{ task: any; index: any }> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={style.taskContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
