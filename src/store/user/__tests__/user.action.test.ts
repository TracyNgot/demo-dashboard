import {
  GetUsers,
  UserAction,
  UserActionDone,
  UserActionError,
} from '../user.action';

describe('UserAction', () => {
  test(UserAction.GET_USERS, () => {
    expect(GetUsers()).toEqual({ type: UserAction.GET_USERS });
  });

  test(UserAction.DONE, () => {
    expect(UserActionDone({}, UserAction.GET_USERS)).toEqual({
      type: UserAction.DONE,
      payload: {},
      actionName: UserAction.GET_USERS,
    });
  });

  test(UserAction.ERROR, () => {
    expect(UserActionError({ error: 'error' }, UserAction.GET_USERS)).toEqual({
      type: UserAction.ERROR,
      error: { error: 'error' },
      actionName: UserAction.GET_USERS,
    });
  });
});
