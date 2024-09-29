import React from "react";
import s from "./Header.module.scss";
import logo from "../../assets/logo.svg";
import like from "../../assets/Vector.svg";
import bell from "../../assets/mi_notification.svg";
import avatar from "../../assets/Foto.svg";
const Header = () => {
  return (
    <div className={s.headerContainer}>
      <div className={s.header}>
        <img src={logo} alt="logo" className={s.logo} />
        <div className={s.social}>
          <div className={s.icons}>
            <img src={like} alt="favorite" className={s.icon} />
            <img src={bell} alt="notification" className={s.icon} />
          </div>
          <div className={s.userBlock}>
            <img className={s.userAvatar} src={avatar} alt="avatar" />
            <div className={s.userName}>Ivan1234</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
