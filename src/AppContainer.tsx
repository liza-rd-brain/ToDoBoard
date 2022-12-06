import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useFireBase } from "./effect";

import { State } from "./types";

import style from "./index.module.scss";
import { FC } from "react";

/*
 */
export const AppContainer: FC<{ children: JSX.Element }> = ({ children }) => {
  const { view } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  // const { pathname } = useLocation();
  const { id: currQuery } = useParams();

  const endedDrag = (result: DropResult) => {
    dispatch({ type: "endedDrag", payload: result });
  };

  useFireBase(currQuery);

  return (
    <DragDropContext onDragEnd={endedDrag}>
      {children}
      {/* <div className={style.container}>{children}</div> */}
    </DragDropContext>
  );
};
