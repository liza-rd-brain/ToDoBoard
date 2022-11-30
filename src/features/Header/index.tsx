import { useDispatch, useSelector } from "react-redux";
import { HeaderType, State, ViewList } from "../../types";
import style from "./index.module.scss";

import { useNavigate, useLocation, Link, useMatches } from "react-router-dom";
import { FC } from "react";

export const Header: FC<{ type: HeaderType }> = ({ type: headerType }) => {
  const dispatch = useDispatch();
  const { view } = useSelector((state: State) => state);
  const navigate = useNavigate();

  const newTaskKey = "new";

  const createItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    switch (headerType) {
      case "project": {
        dispatch({ type: "createProject" });
        break;
      }
      case "task": {
        dispatch({ type: "createTask" });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <header className={style.header}>
      <Link to="/">
        <div className={style.logo}></div>
      </Link>

      {headerType === "task" ? (
        // <Link
        //   key={"new"}
        //   // to={`${match.url}/edit`}
        //   to={`/task/${"new"}`}
        // >
        <button
          className={style.button}
          onClick={() => {
            navigate(`/task/${newTaskKey}`);
          }} /* onClick={createItem} */
        >
          +
        </button>
      ) : (
        // </Link>
        <button className={style.button} onClick={createItem}>
          +
        </button>
      )}
    </header>
  );
};
