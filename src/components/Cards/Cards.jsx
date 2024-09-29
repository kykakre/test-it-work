import React, { useEffect, useRef, useState } from "react";
import s from "./Card.module.scss";
import Card from "./Card";

export default function Cards({
  users,
  handleArchive,
  handleDelete,
  archive,
  handleRestore,
}) {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const cardRefs = useRef([]);

  const handleCardClick = (index) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setOpenCardIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [users]); // Теперь следим за изменениями в массиве пользователей

  return (
    <div className={s.usersContainer}>
      {users?.map((e, index) => (
        <Card
          key={e?.id}
          ref={(el) => (cardRefs.current[index] = el)} // Добавляем ref
          archive={archive}
          index={index}
          isOpen={openCardIndex === index}
          handleCardClick={handleCardClick}
          handleRestore={handleRestore}
          handleArchive={handleArchive}
          handleDelete={handleDelete}
          id={e?.id}
          username={e?.name}
          city={e?.address.city}
          companyName={e?.company.name}
        />
      ))}
    </div>
  );
}
