import React, { useEffect } from "react";
import Title from "../components/Title/Title";
import Cards from "../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllUsersQuery } from "../service/userService";
import {
  archiveUser,
  deleteUser,
  editUser,
  restoreUserFromArchive,
  setUsers,
} from "../store/slices/usersSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const { data: usersFromApi, isLoading, error } = useFetchAllUsersQuery(); // Получаем пользователей из API
  const users = useSelector((state) => state.user.users); // Локальные пользователи
  const archivedUsers = useSelector((state) => state.user.archivedUsers); // Архив пользователей

  // Сохраняем пользователей в локальное состояние после получения с API
  useEffect(() => {
    if (usersFromApi) {
      dispatch(setUsers(usersFromApi)); // Устанавливаем пользователей в локальное состояние
    }
  }, [usersFromApi, dispatch]);

  // Удаление пользователя
  const handleDelete = (id) => {
    console.log(id, "delete");
    dispatch(deleteUser(id));
  };

  // Редактирование пользователя
  const handleEdit = (id) => {
    const updatedUser = { id, name: "Updated Name" }; // Пример редактирования
    dispatch(editUser(updatedUser));
  };

  // Архивирование пользователя
  const handleArchive = (id) => {
    console.log(id, "arhive");
    dispatch(archiveUser(id));
  };

  const handleRestore = (id) => {
    dispatch(restoreUserFromArchive(id)); // Восстанавливаем пользователя
  };

  return (
    <div className="content">
      <Title title="Активные" />
      <Cards
        users={users}
        archive={false}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
      />
      <Title title="Архив" />
      <Cards
        users={archivedUsers}
        archive={true}
        handleRestore={handleRestore}
      />
    </div>
  );
}
