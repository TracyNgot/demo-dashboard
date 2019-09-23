import {
  GetUsers,
  UserAction,
  UserActionDone,
  UserActionError,
} from '../user.action';
import { initialUserState, userReducer } from '../user.reducer';

describe('User reducer', () => {
  describe('nonsense returns default state', () => {
    test('nonsense', () => {
      let state = userReducer(initialUserState, 'NYEHEHE');
      expect(state).toEqual(initialUserState);

      state = userReducer(initialUserState, UserActionDone({}, 'NYEHEHE'));
      expect(state).toEqual(initialUserState);

      state = userReducer(initialUserState, UserActionError({}, 'NYEHEHE'));
      expect(state).toEqual(initialUserState);
    });
  });

  describe('Get users', () => {
    it('sets loading=true', () => {
      const state = userReducer(initialUserState, GetUsers());
      expect(state.loading).toBeTruthy();
    });

    it('updates state with users list', () => {
      const state = userReducer(
        initialUserState,
        UserActionDone(
          [
            {
              id: 1,
              first_name: 'Loutitia',
              last_name: 'Steaning',
              email: 'lsteaning0@usnews.com',
              date_of_birth: '13/05/1978',
              industry: 'n/a',
              salary: 98803.83,
              years_of_experience: 6.6,
            },
            {
              id: 2,
              first_name: 'Ewen',
              last_name: 'McLewd',
              email: 'emclewd1@bbb.org',
              date_of_birth: '15/12/1991',
              industry: 'Telecommunications Equipment',
              salary: 144392.9,
              years_of_experience: 2.8,
            },
            {
              id: 3,
              first_name: 'Park',
              last_name: null,
              email: null,
              date_of_birth: '11/06/1993',
              industry: 'n/a',
              salary: 101773.01,
              years_of_experience: 1.8,
            },
          ],
          UserAction.GET_USERS,
        ),
      );

      expect(state.loading).toBeFalsy();
      expect(state.users).toHaveLength(3);
      expect(state.users[0].first_name).toEqual('Loutitia');
    });

    it('sets error', () => {
      const state = userReducer(
        initialUserState,
        UserActionError({ error: 'error' }, UserAction.GET_USERS),
      );

      expect(state.loading).toBeFalsy();
      expect(state.error).toBeDefined();
    });
  });
});
