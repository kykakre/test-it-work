import React, { useEffect, useState } from "react";
import s from "./EditProfileForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserQuery } from "../../service/userService";
import { editUser, setUser } from "../../store/slices/personalUserSlice";
import { useParams } from "react-router-dom";
import CustomPopup from "../CustomPopup/CustomPopup";
import success from "../../assets/success.svg";

export default function EditProfileForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: usersFromApi, isLoading, error } = useFetchUserQuery(id);

  // Локальное состояние для редактирования
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.personalReducer.user);

  // Заполняем форму данными из API
  useEffect(() => {
    if (usersFromApi) {
      dispatch(setUser(usersFromApi));
      setFormData(usersFromApi); // Заполняем локальное состояние
    }
  }, [usersFromApi, dispatch]);

  // Обработчик изменения данных формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Очистка поля
  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  // Валидация полей (например, проверка на пустоту)
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Имя не может быть пустым";
    if (!formData.username) newErrors.username = "Никнейм не может быть пустым";
    if (!formData.email) newErrors.email = "Почта не может быть пустой";
    // Добавляем другие проверки при необходимости

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик сохранения данных
  const handleEdit = () => {
    if (!validate()) return; // Если валидация не прошла, не продолжаем

    dispatch(editUser({ id, ...formData })); // Сохраняем только валидные данные
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className={s.box}>
      <div className={s.title}>Данные профиля</div>
      {isLoading  ? <div>Loading...</div>:<> <form>
        <div className={s.inputItem}>
          <div className={s.label}>Имя</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
            {formData.name && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("name")}
              >
                &times;
              </span>
            )}
          </div>
          {errors.name && <div className={s.error}>{errors.name}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Никнейм</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="username"
              value={formData.username || ""}
              onChange={handleInputChange}
            />
            {formData.username && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("username")}
              >
                &times;
              </span>
            )}
          </div>
          {errors.username && <div className={s.error}>{errors.username}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Почта</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
            {formData.email && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("email")}
              >
                &times;
              </span>
            )}
          </div>
          {errors.email && <div className={s.error}>{errors.email}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Город</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="address.city"
              value={formData.address?.city || ""}
              onChange={handleInputChange}
            />
            {formData.address?.city && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("address.city")}
              >
                &times;
              </span>
            )}
          </div>
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Телефон</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
            {formData.phone && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("phone")}
              >
                &times;
              </span>
            )}
          </div>
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Название компании</div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              name="company.name"
              value={formData.company?.name || ""}
              onChange={handleInputChange}
            />
            {formData.company?.name && (
              <span
                className={s.clearButton}
                onClick={() => handleClearField("company.name")}
              >
                &times;
              </span>
            )}
          </div>
        </div>
      </form>
      <button className={s.button} onClick={handleEdit}>
        Сохранить
      </button></>}
     
      <CustomPopup isOpen={isModalOpen} onClose={closeModal}>
        <div className={s.modalContainer}>
          <img src={success} className={s.success} alt="success_icon" />
          <p className={s.successText}>Изменения сохранены!</p>
        </div>
      </CustomPopup>
    </div>
  );
}
