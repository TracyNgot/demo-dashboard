import { of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { UserActionDone, UserAction, UserActionError } from './user.action';
import UserService from './user.service';

export const getUsers = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === UserAction.GET_USERS),
    mergeMap(() =>
      UserService.getUsers().pipe(
        map(data => UserActionDone(data.response, UserAction.GET_USERS)),
        catchError(error => of(UserActionError(error, UserAction.GET_USERS))),
      ),
    ),
  );
