import { useRef } from "react";
import { useDispatch } from "react-redux";
import style from "./index.module.scss";

const SAVE_BUTTON_TEXT = "save";
const PLACEHOLDER_INPUT = "Project name";

export const NewProject = () => {
  const dispatch = useDispatch();

  const textInput = useRef<HTMLInputElement>(null);

  const saveProject = () => {
    // console.log(textInput.current?.value);
    dispatch({ type: "startedSaveProject", payload: textInput.current?.value });
  };

  return (
    <div className={style.container}>
      {/* <label htmlFor="explicit-label-name">Last Name: </label> */}
      <input type="text" placeholder={PLACEHOLDER_INPUT} ref={textInput} />
      <button type="submit" className={style.button} onClick={saveProject}>
        {SAVE_BUTTON_TEXT}
      </button>
    </div>
  );
};
