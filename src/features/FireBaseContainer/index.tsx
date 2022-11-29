import { useSelector } from "react-redux";
import { Preloader } from "../../component/Preloader";
import { useFireBase } from "../../effect";
import { ProjectBoard } from "../../pages/ProjectBoard";
import { State } from "../../types";

import style from "./index.module.scss";

export const FireBaseContainer = () => {
  const { view } = useSelector((state: State) => state);

  const getView = () => {
    switch (view) {
      case "preloader": {
        return <Preloader type="big" />;
      }
      case "projectBoard": {
        return <ProjectBoard />;
      }
      default: {
        return null;
      }
    }
  };

  useFireBase();

  return <div className={style.container}>{getView()}</div>;
};
