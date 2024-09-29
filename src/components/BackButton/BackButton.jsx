import React from "react";
import s from "./BackButton.module.scss";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import back from "../../assets/Backarrow.svg";

export default function BackButton() {
  return (
    <Link to="/" className={s.buttonContainer}>
      <div className={s.flexContent}>
        <ReactSVG src={back} className={s.icon} />
        <div className={s.text}>Назад</div>
      </div>
    </Link>
  );
}
