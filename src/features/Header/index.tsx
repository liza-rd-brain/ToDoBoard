import { useDispatch } from "react-redux";
import style from "./index.module.scss";

export const Header = () => {
  const dispatch = useDispatch();

  const createProject = () => {
    dispatch({ type: "createProject" });
  };

  return (
    <header className={style.header}>
      <div className={style.logo}></div>
      <button className={style.button} onClick={createProject}>
        +
      </button>
    </header>
  );
};
