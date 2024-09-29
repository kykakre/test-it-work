import React, { useEffect, useState } from "react";
import s from "./EditProfileForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserQuery } from "../../service/userService";
import { editUser, setUser } from "../../store/slices/personalUserSlice";
import { useParams } from "react-router-dom";

export default function EditProfileForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
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
  };

  return (
    <div className={s.box}>
      <div className={s.title}>Данные профиля</div>
      <form>
        <div className={s.inputItem}>
          <div className={s.label}>Имя</div>
          <input
            className={s.input}
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
          {errors.name && <div className={s.error}>{errors.name}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Никнейм</div>
          <input
            className={s.input}
            name="username"
            value={formData.username || ""}
            onChange={handleInputChange}
          />
          {errors.username && <div className={s.error}>{errors.username}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Почта</div>
          <input
            className={s.input}
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
          {errors.email && <div className={s.error}>{errors.email}</div>}
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Город</div>
          <input
            className={s.input}
            name="address.city"
            value={formData.address?.city || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Телефон</div>
          <input
            className={s.input}
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className={s.inputItem}>
          <div className={s.label}>Название компании</div>
          <input
            className={s.input}
            name="company.name"
            value={formData.company?.name || ""}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button className={s.button} onClick={handleEdit}>
        Сохранить
      </button>
    </div>
  );
}
