import React from "react";
import s from "./AvatarDetail.module.scss";
import photo from "../../assets/rayul-_M6gy9oHgII-unsplash (1) 1.svg";

export default function AvatarDetail() {
  return (
    <div className={s.box}>
      <img className={s.PhotoProfile} src={photo} alt="PhotoProfile" />
      <div className={`${s.link} ${s.linkActive}`}>Данные профиля</div>
      <div className={s.link}>Рабочее пространство</div>
      <div className={s.link}>Приватность</div>
      <div className={s.link}>Безопасность</div>
    </div>
  );
}
