import React, { FC, FormEvent, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import style from "./index.module.scss";

const NAME_TASK_TEXT = "заголовок";

export const TaskCard = () => {
  const dispatch = useDispatch();
  const textInput = useRef<HTMLInputElement>(null);

  const saveTask = (e: FormEvent) => {
    e.preventDefault();
    if (textInput.current?.value) {
      // dispatch({
      //   type: "startedSaveTask",
      //   payload: newPayload,
      // });
    }
  };

  return (
    <div className={style.taskContainer}>
      <form onSubmit={saveTask}>
        <div className="content-row">
          <div className="task-caption">{NAME_TASK_TEXT}</div>

          <input
            required={true}
            ref={textInput}
            type="text"
            className="task-textinput"
            placeholder="название задачи"
          />
        </div>
      </form>
    </div>
  );
};
