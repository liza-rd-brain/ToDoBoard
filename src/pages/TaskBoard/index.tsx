import { useParams } from "react-router-dom";

import style from "./index.module.scss";
import { Header } from "../../features/Header";
import { TaskBoardContainer } from "../../features/TaskBoardContainer";
import { useSelector } from "react-redux";
import { State } from "../../types";
import { createPortal } from "react-dom";
import { TaskCard } from "../../component/TaskCard";
import { useState } from "react";
import Modal from "../../component/Modal";

export const TaskBoard = () => {
  const { id } = useParams();
  const { phase, view } = useSelector((state: State) => state);

  //для модалки
  // const [isOpen, setIsOpen] = useState(false);

  const getView = () => {
    console.log("view", view);
    switch (view) {
      case "taskBoard":
      case "task": {
        return (
          <div className={style.containerWrap} id="taskBoard">
            <Modal
              // onClose={() => {
              //   setIsOpen(false);
              // }}
              open={view === "task"}
            >
              <TaskCard />
            </Modal>
            <Header /* key={view}  */ />
            <TaskBoardContainer />
          </div>
        );
      }
      // case "task": {
      //   const parentForCard = document.getElementById("taskBoard");

      //   if (parentForCard instanceof HTMLElement) {
      //     const cardPortal = createPortal(<TaskCard />, parentForCard);
      //     return (
      //       <div className={style.containerWrap} id="taskBoard">
      //         {cardPortal}
      //         <Header /* key={view}  */ />
      //         <TaskBoardContainer />
      //       </div>
      //     );
      //   } else {
      //     //TODO: экран ошибки
      //     return null;
      //   }
      // }
      default: {
        //TODO: экран ошибки
        return null;
      }
    }
  };

  return (
    <div
      className={
        view === "task"
          ? `${style.container} ${style.containerBlur}`
          : style.container
      }
    >
      {getView()}
    </div>
  );
};
