import React, { useEffect } from "react";
import Title from "../components/Title/Title";
import Cards from "../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllUsersQuery } from "../service/userService";
import {
  archiveUser,
  deleteUser,
  restoreUserFromArchive,
  setUsers,
} from "../store/slices/usersSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const { data: usersFromApi, isLoading, error } = useFetchAllUsersQuery();
  const users = useSelector((state) => state.user.users);
  const archivedUsers = useSelector((state) => state.user.archivedUsers);

  useEffect(() => {
    if (usersFromApi) {
      dispatch(setUsers(usersFromApi));
    }
  }, [usersFromApi, dispatch]);

  const handleDelete = (id) => {
    console.log(id, "delete");
    dispatch(deleteUser(id));
  };
  const handleArchive = (id) => {
    console.log(id, "arhive");
    dispatch(archiveUser(id));
  };

  const handleRestore = (id) => {
    dispatch(restoreUserFromArchive(id));
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
