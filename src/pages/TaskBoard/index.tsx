import { useParams } from "react-router-dom";

import style from "./index.module.scss";
import { Header } from "../../features/Header";

export const TaskBoard = () => {
  const { id } = useParams();
  // contyst {  } = useSelector((state: State) => state);

  return (
    <div className={style.container}>
      <Header />
      <div>здесь будут задачи</div>
      {/* <BoardContainer /> */}
    </div>
  );
};
