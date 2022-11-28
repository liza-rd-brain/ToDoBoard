import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

export type ActionType = { type: "appLoaded" };

export const useAppDispatch = () => {
  const appDispatch = useDispatch<Dispatch<ActionType>>();
  return appDispatch;
};
