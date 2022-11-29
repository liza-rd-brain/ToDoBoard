import { FC } from "react";
import { useDispatch } from "react-redux";
import { ProjectId } from "../../types";
import style from "./index.module.scss";

export const ProjectCard: FC<{ name: string; id: ProjectId }> = ({
  name,
  id,
}) => {
  const dispatch = useDispatch();

  const openProject = () => {
    dispatch({ type: "openProject", payload: id });
  };

  return (
    <div className={style.container} onClick={openProject}>
      <div className={style.text}>{name}</div>
    </div>
  );
};
