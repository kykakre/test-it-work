import { createSlice } from "@reduxjs/toolkit";

const personalUserSlice = createSlice({
  name: "personalUser",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    editUser: (state, action) => {
      // Обновляем конкретного пользователя
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { editUser, setUser } = personalUserSlice.actions;
export default personalUserSlice.reducer;
