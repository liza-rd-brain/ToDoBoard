import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { Preloader } from "../../component/Preloader";
import { useFireBase } from "../../effect";
import { ProjectBoard } from "../../pages/ProjectBoard";
import { TaskBoard } from "../../pages/TaskBoard";
import { State } from "../../types";

import style from "./index.module.scss";

export const FireBaseContainer = () => {
  const { view } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id: currQuery } = useParams();

  const getView = () => {
    switch (view) {
      case "preloader": {
        return <Preloader type="big" />;
      }

      default: {
        return (
          <Routes>
            <Route path="/" element={<ProjectBoard />} />
            <Route path="/project/:id/" element={<TaskBoard />}>
              <Route path="task:id" element={<TaskBoard />} />
              <Route path="task/new" element={<TaskBoard />} />
            </Route>
          </Routes>
        );
      }
    }
  };

  const endedDrag = (result: DropResult) => {
    dispatch({ type: "endedDrag", payload: result });
  };

  useFireBase(pathname, currQuery);

  return (
    <DragDropContext onDragEnd={endedDrag}>
      <div className={style.container}>{getView()}</div>
    </DragDropContext>
  );
};
