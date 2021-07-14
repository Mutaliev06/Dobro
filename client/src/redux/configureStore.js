import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import notesReducer from "./features/notes";
import categoriesReducer from "./features/categories";
import usersReducer from "./features/users";
import commentsReducer from "./features/comments";
import application from './features/application';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    categories: categoriesReducer,
    comments: commentsReducer,
    notes: notesReducer,
    users: usersReducer,
    application: application,
  }),
  applyMiddleware(thunk, logger)
);