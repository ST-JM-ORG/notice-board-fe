import {
  Action,
  configureStore,
  ReducerType,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";

import AuthSlice from "@redux/modules/auth-slice";

const reducer = combineReducers({
  auth: AuthSlice.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<ReducerType, unknown, Action>;

export default store;
