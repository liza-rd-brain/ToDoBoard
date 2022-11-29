import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Preloader } from "../../component/Preloader";
import { useFireBase } from "../../effect";
import { ProjectBoard } from "../../pages/ProjectBoard";
import { TaskBoard } from "../../pages/TaskBoard";
import { State } from "../../types";

import style from "./index.module.scss";

export const FireBaseContainer = () => {
  const { view } = useSelector((state: State) => state);

  const getView = () => {
    switch (view) {
      case "preloader": {
        return <Preloader type="big" />;
      }

      default: {
        return (
          <Routes>
            <Route path="/" element={<ProjectBoard />} />
            <Route path="/project/:name" element={<TaskBoard />} />
          </Routes>
        );
      }
    }
  };

  useFireBase();

  return <div className={style.container}>{getView()}</div>;
};
