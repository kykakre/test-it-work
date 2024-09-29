import React, { forwardRef } from "react";
import s from "./Card.module.scss";
import avatar from "../../assets/avatar.png";
import details from "../../assets/more_instrukt.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const Card = forwardRef(
  (
    {
      username,
      city,
      companyName,
      id,
      index,
      handleCardClick,
      isOpen,
      handleArchive,
      handleDelete,
      handleRestore,
      archive,
    },
    ref
  ) => {
    const archivedUser = () => {
      handleArchive(id);
      setTimeout(() => handleCardClick(null), 0);
    };

    const deleteUser = () => {
      handleDelete(id);
      setTimeout(() => handleCardClick(null), 0);
    };

    const restoreUser = () => {
      handleRestore(id);
      setTimeout(() => handleCardClick(null), 0);
    };

    return (
      <div className={s.userCard} ref={ref}>
        <img
          className={`${s.avatar} ${archive ? s.avatarArchive : ""}`}
          alt="avatar"
          src={avatar}
        />
        <div className={s.info}>
          <div className={s.flexColumn}>
            <div className={`${s.name} ${archive ? s.nameArchive : ""}`}>
              {username}
            </div>
            <div className={`${s.company} ${archive ? s.textArchive : ""}`}>
              {companyName}
            </div>
          </div>

          <div className={`${s.city} ${archive ? s.textArchive : ""}`}>
            {city}
          </div>
        </div>
        <ReactSVG
          className={s.details}
          src={details}
          alt="details"
          onClick={() => handleCardClick(index)}
        />
        {isOpen && (
          <div className={s.select}>
            {archive ? (
              <div className={s.item} onClick={restoreUser}>
                Активировать
              </div>
            ) : (
              <>
                <Link to={`/user/${id}`} className={s.item}>
                  Редактировать
                </Link>

                <div className={s.item} onClick={archivedUser}>
                  Архивировать
                </div>
                <div className={s.item} onClick={deleteUser}>
                  Скрыть
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default Card;
