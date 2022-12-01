import React, { FC, FormEvent, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import style from "./index.module.scss";

const NAME_TASK_TEXT = "заголовок";
const SAVE_BUTTON_TEXT = "сохранить";

export const TaskCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textInput = useRef<HTMLInputElement>(null);

  const currProjectID = useParams();

  console.log("params", currProjectID);

  const saveTask = (e: FormEvent) => {
    debugger;
    e.preventDefault();
    e.stopPropagation();
    if (textInput.current?.value) {
      dispatch({
        type: "startedSaveTask",
        payload: {
          projectId: currProjectID.id,
          taskItem: {
            name: textInput.current?.value,
          },
        },
      });
      navigate(-1);
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

          <button type="submit" className="save">
            {SAVE_BUTTON_TEXT}
          </button>
        </div>
      </form>
    </div>
  );
};
