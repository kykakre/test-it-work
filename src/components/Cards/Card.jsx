import React, { forwardRef } from "react";
import s from "./Card.module.scss";
import avatar from "../../assets/avatar.png";
import details from "../../assets/more_instrukt.svg";
import { ReactSVG } from "react-svg";

// Используем forwardRef, чтобы передать ref из родительского компонента Cards
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
      setTimeout(() => handleCardClick(null), 0); // Закрываем карточку после архивации
    };
    const deleteUser = () => {
      handleDelete(id);
      handleCardClick(null); // Закрываем карточку после удаления
    };
    const restoreUser = () => {
      handleRestore(id);
      handleCardClick(null); // Закрываем карточку после восстановления
    };

    return (
      <div className={s.userCard} ref={ref}>
        {" "}
        {/* Добавляем ref */}
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
          onClick={() => handleCardClick(index)} // Открытие/закрытие карточки
        />
        {isOpen && (
          <div className={s.select}>
            {archive ? (
              <div className={s.item} onClick={restoreUser}>
                Активировать
              </div>
            ) : (
              <>
                <div className={s.item}>Редактировать</div>
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
