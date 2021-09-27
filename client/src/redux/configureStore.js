import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import notesReducer from "../../../../Dobro/client/src/redux/features/notes";
import categoriesReducer from "../../../../Dobro/client/src/redux/features/categories";
import usersReducer from "../../../../Dobro/client/src/redux/features/users";
import commentsReducer from "../../../../Dobro/client/src/redux/features/comments";
import application from '../../../../Dobro/client/src/redux/features/application';
import { composeWithDevTools } from 'redux-devtools-extension';

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
  }), composeWithDevTools(
  applyMiddleware(thunk, logger)
)
);