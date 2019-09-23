import { ajax } from 'rxjs/ajax';

const UserService = {
  getUsers: () =>
    ajax.get('/api/users.json', { 'Content-Type': 'application/json' }),
};

export default UserService;
