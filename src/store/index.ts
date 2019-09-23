import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { getUsers } from './user/user.epic';
import { userReducer } from './user/user.reducer';

const reducers = combineReducers({
  userReducer,
});

const epic = combineEpics(getUsers);
const epicMiddleware = createEpicMiddleware();

const store = createStore(reducers, applyMiddleware(epicMiddleware));

epicMiddleware.run(epic);

export default store;
