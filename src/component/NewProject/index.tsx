import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import style from "./index.module.scss";

const SAVE_BUTTON_TEXT = "save";
const PLACEHOLDER_INPUT = "Project name";

export const NewProject = () => {
  const dispatch = useDispatch();

  const textInput = useRef<HTMLInputElement>(null);

  const saveProject = () => {
    const currDate = dayjs().valueOf();
    // console.log("currDate", currDate);
    dispatch({
      type: "startedSaveProject",
      payload: { name: textInput.current?.value, date: currDate },
    });
  };

  const closeNewProject = (e: MouseEvent) => {
    const container = document.querySelector("#newContainer") as Element;

    const withinBoundaries = e.composedPath().includes(container);
    if (!withinBoundaries) {
      dispatch({ type: "revertNewProject" });
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeNewProject);

    return () => {
      document.removeEventListener("click", closeNewProject);
    };
  }, []);

  return (
    <div id="newContainer" className={style.container}>
      <input type="text" placeholder={PLACEHOLDER_INPUT} ref={textInput} />
      <button type="submit" className={style.button} onClick={saveProject}>
        {SAVE_BUTTON_TEXT}
      </button>
    </div>
  );
};
