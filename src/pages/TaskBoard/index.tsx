import { useParams } from "react-router-dom";

import style from "./index.module.scss";
import { Header } from "../../features/Header";
import { TaskBoardContainer } from "../../features/TaskBoardContainer";

export const TaskBoard = () => {
  const { id } = useParams();
  // contyst {  } = useSelector((state: State) => state);

  return (
    <div className={style.container}>
      <Header />
      <TaskBoardContainer />
    </div>
  );
};
