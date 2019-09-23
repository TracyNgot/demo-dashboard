import { ActionsObservable } from 'redux-observable';
import { of, throwError } from 'rxjs';

import {
  GetUsers,
  UserAction,
  UserActionDone,
  UserActionError,
} from '../user.action';
import { getUsers } from '../user.epic';
import UserService from '../user.service';

describe('UserEpic', () => {
  describe('getUsers', () => {
    beforeEach(() => jest.resetAllMocks());

    it('dispatches done if ok', done => {
      const payload = { response: [{ id: 1 }] };
      const spy = jest
        .spyOn(UserService, 'getUsers')
        .mockImplementation(() => of(payload));
      const action$ = ActionsObservable.of(GetUsers());
      const expected = UserActionDone(payload.response, UserAction.GET_USERS);
      getUsers(action$).subscribe(action => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(action).toEqual(expected);
        done();
      });
    });

    it('dispatches error if not ok', done => {
      const payload = { error: 'x' };
      const spy = jest
        .spyOn(UserService, 'getUsers')
        .mockImplementation(() => throwError(payload));
      const action$ = ActionsObservable.of(GetUsers());
      const expected = UserActionError(payload, UserAction.GET_USERS);
      getUsers(action$).subscribe(action => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(action).toEqual(expected);
        done();
      });
    });
  });
});
