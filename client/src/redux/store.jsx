import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducerFetchAllUsers from "./reducers/users/reducerFetchAllUsers";
import reducerFetchCurrentUser from "./reducers/users/reducerFetchCurrentUser";

const rootreducer = combineReducers({
  currentUser: reducerFetchCurrentUser,
  allUsers: reducerFetchAllUsers,
});

const store = createStore(rootreducer, applyMiddleware(thunk));

export default store;
