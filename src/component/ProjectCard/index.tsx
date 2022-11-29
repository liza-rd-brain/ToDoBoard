import { FC } from "react";
import style from "./index.module.scss";

export const ProjectCard: FC<{ name: string }> = ({ name }) => {
  return (
    <div className={style.container}>
      <div>{name}</div>
    </div>
  );
};
