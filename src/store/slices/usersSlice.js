import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    archivedUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    archiveUser: (state, action) => {
      const userToArchive = state.users.find(
        (user) => user.id === action.payload
      );
      if (userToArchive) {
        state.archivedUsers.push(userToArchive);
        state.users = state.users.filter((user) => user.id !== action.payload);
      }
    },
    restoreUserFromArchive: (state, action) => {
      const userToRestore = state.archivedUsers.find(
        (user) => user.id === action.payload
      );
      if (userToRestore) {
        state.users.push(userToRestore); // Возвращаем пользователя в основной список
        state.archivedUsers = state.archivedUsers.filter(
          (user) => user.id !== action.payload
        ); // Удаляем из архива
      }
    },
  },
});

export const {
  setUsers,
  deleteUser,
  editUser,
  archiveUser,
  restoreUserFromArchive,
} = userSlice.actions;
export default userSlice.reducer;
