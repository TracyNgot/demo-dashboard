import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import UserService from '../user.service';

describe('UserService', () => {
  test('getUsers', () => {
    const spy = jest
      .spyOn(ajax, 'get')
      .mockImplementation(() => of([{ id: 1 }]));

    UserService.getUsers();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
