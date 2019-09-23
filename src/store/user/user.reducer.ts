import { UserAction } from './user.action';
import { UserModel } from './user.model';

export interface UserState {
  loading: boolean;
  users: UserModel[];
  error?: any;
}

export const initialUserState: UserState = {
  loading: false,
  users: [],
};

export const userReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case UserAction.DONE:
      if (action.actionName === UserAction.GET_USERS)
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      break;
    case UserAction.ERROR:
      if (action.actionName === UserAction.GET_USERS)
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      break;
    case UserAction.GET_USERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      break;
  }
  return state;
};
