import { ProjectBoardContainer } from "../../features/ProjectBoardContainer";
import { Header } from "../../features/Header";

import style from "./index.module.scss";
import { useSelector } from "react-redux";
import { State } from "../../types";
import { Preloader } from "../../component/Preloader";
import { useFireBase, useLoadFireBase } from "../../effect";

export const ProjectBoard = () => {
  const { view } = useSelector((state: State) => state);
  //Подобие header +логотип на индекс
  //кнопка создать проект
  // выбрать проект

  const getView = () => {
    switch (view) {
      case "preloader": {
        return <Preloader type="big" />;
      }

      default: {
        return (
          <>
            <ProjectBoardContainer />
          </>
        );
      }
    }
  };

  useLoadFireBase();

  return (
    <div className={style.container}>
      <Header type="project" />
      {getView()}
    </div>
  );
};
