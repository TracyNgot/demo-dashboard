import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

import App from '../App';
import { initialUserState } from '../../store/user/user.reducer';

describe('App', () => {
  it('renders without crashing', () => {
    const store = configureStore()({
      userState: initialUserState,
      getUsers: jest.fn(),
    });
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
});
