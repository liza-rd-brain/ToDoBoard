import { useDispatch, useSelector } from "react-redux";
import { HeaderType, State, ViewList } from "../../types";
import style from "./index.module.scss";

import {
  useNavigate,
  useLocation,
  Link,
  useMatches,
  matchRoutes,
} from "react-router-dom";

import { FC } from "react";

export const Header: FC<{ type: HeaderType }> = ({ type: headerType }) => {
  // const routes = [{ path: "/project" }];
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(location.pathname);

  // console.log("currentPath", currentPath);

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
        <Link key={"new"} to={`task/${"new"}`}>
          <button
            className={style.button}
            // onClick={createItem}
            // onClick={() => {
            //   navigate(`/task/${newTaskKey}`, {
            //     replace: true,
            //     state: { modalOpen: true },
            //   });
            // }}
          >
            +
          </button>
        </Link>
      ) : (
        // </Link>
        <button className={style.button} onClick={createItem}>
          +
        </button>
      )}
    </header>
  );
};
