export enum UserAction {
  GET_USERS = '[GET_USERS] List users',
  ERROR = '[ERROR] User action error',
  DONE = '[DONE] User action done',
}

export const GetUsers = () => ({
  type: UserAction.GET_USERS,
});

export const UserActionDone = (payload: any, actionName: UserAction) => ({
  type: UserAction.DONE,
  payload,
  actionName,
});

export const UserActionError = (error: any, actionName: UserAction) => ({
  type: UserAction.ERROR,
  error,
  actionName,
});
