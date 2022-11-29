import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { db, firebaseConfig } from "../../firebase";
import style from "./index.module.scss";

export const ProjectBoard = () => {
  //Подобие header +логотип на индекс
  //кнопка создать проект
  // выбрать проект

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.logo}></div>
      </header>
      <div className={style.projectList}>
        <button className={style.button}>+</button>

        {/* Далее иконки проектов */}
      </div>
    </div>
  );
};
