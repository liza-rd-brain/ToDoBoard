import { useLocation, useParams } from "react-router-dom";

import style from "./index.module.scss";
import { Header } from "../../features/Header";
import { TaskBoardContainer } from "../../features/TaskBoardContainer";

import { TaskCard } from "../../component/TaskCard";

import { Modal } from "../../component/Modal";
import { FC } from "react";

export const TaskBoard = () => {
  const { id } = useParams();
  //TODO: как это исправить, не работает как динамический роут pathname === "/task/new"
  const { pathname } = useLocation();

  const modalOpen = pathname.includes("task");

  console.log("currTaskId,", id);

  console.log("modalOpen", modalOpen, pathname);

  return (
    <div className={style.container}>
      <Modal isOpen={Boolean(modalOpen)}>
        <TaskCard />
      </Modal>
      <Header type="task" />
      <TaskBoardContainer />
    </div>
  );
};
