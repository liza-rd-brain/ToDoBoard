import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../../features/Header";
import { State } from "../../types";

import style from "./index.module.scss";

export const TaskBoard = () => {
  const { currProjectId } = useSelector((state: State) => state);

  console.log(currProjectId);

  return (
    <div className={style.container}>
      <Header />
      <div>здесь будут задачи</div>
      {/* <BoardContainer /> */}
    </div>
  );
};
