import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../service/userService";
import userReducer from "./slices/usersSlice";
import personalUserReducer from "./slices/personalUserSlice";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  user: userReducer,
  personalReducer: personalUserReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware),
  });
};
