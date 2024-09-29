import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../service/userService";
import userReducer from "./slices/usersSlice";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  user: userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware),
  });
};
