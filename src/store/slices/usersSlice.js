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
        state.users.push(userToRestore);
        state.archivedUsers = state.archivedUsers.filter(
          (user) => user.id !== action.payload
        );
      }
    },
  },
});

export const { setUsers, deleteUser, archiveUser, restoreUserFromArchive } =
  userSlice.actions;
export default userSlice.reducer;
