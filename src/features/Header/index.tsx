import { useDispatch, useSelector } from "react-redux";
import { State } from "../../types";
import style from "./index.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const { view } = useSelector((state: State) => state);

  const createProject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch({ type: "createItem" });
  };

  return (
    <header className={style.header} /*  key={view} */>
      <div className={style.logo}></div>
      <button className={style.button} onClick={createProject}>
        +
      </button>
    </header>
  );
};
