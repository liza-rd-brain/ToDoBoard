import { useLocation, useParams } from "react-router-dom";

import style from "./index.module.scss";
import { Header } from "../../features/Header";
import { TaskBoardContainer } from "../../features/TaskBoardContainer";

import { TaskCard } from "../../component/TaskCard";

import { Modal } from "../../component/Modal";

export const TaskBoard = () => {
  //TODO: как это исправить, не работает как динамический роут pathname === "/task/new"
  const { pathname } = useLocation();

  return (
    <div className={style.container}>
      <Modal isOpen={pathname === "/task/new"}>
        <TaskCard />
      </Modal>
      <Header type="task" />
      <TaskBoardContainer />
    </div>
  );
};
