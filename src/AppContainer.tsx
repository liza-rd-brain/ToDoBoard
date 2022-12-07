import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useFireBase } from "./effect";

import { FC } from "react";

export const AppContainer: FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch();
  const { id: currQuery } = useParams();

  const endedDrag = (result: DropResult) => {
    dispatch({ type: "endedDrag", payload: result });
  };

  useFireBase();

  return <DragDropContext onDragEnd={endedDrag}>{children}</DragDropContext>;
};
