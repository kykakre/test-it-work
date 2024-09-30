import React from 'react';
import s from "./CustomPopup.module.scss"

const CustomPopup = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null; // Если окно не открыто, возвращаем null (не рендерим)

    // Закрытие окна при клике вне его области
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(s.modalOverlay)) {
        onClose();
      }
    };

    return (
        <div className={s.modalOverlay} onClick={handleOutsideClick}>
        <div className={s.modalContent}>
          <button className={s.closeButton} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
}

export default CustomPopup;
