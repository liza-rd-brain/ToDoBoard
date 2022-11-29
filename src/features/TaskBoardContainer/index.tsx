import { useSelector } from "react-redux";

import { ProjectItemType, State } from "../../types";
import { NewProject } from "../../component/NewProject";
import { ProjectCard } from "../../component/ProjectCard";

import style from "./index.module.scss";
import { Link } from "react-router-dom";

export const TaskBoardContainer = () => {
  const { phase, data } = useSelector((state: State) => state);

  return <>null</>;
};
