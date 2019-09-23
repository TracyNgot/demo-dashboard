import React from 'react';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import ConnectedDashboard, { Dashboard } from '..';

import { initialUserState } from '../../../store/user/user.reducer';

describe('Dashboard', () => {
  const props = {
    userState: initialUserState,
    getUsers: jest.fn(),
  };
  const propsWithUsers = {
    ...props,
    userState: {
      ...initialUserState,
      users: [
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
    },
  };

  beforeEach(() => jest.resetAllMocks());

  it('renders without crashing', () => {
    const store = configureStore()(props);
    const { container } = render(<ConnectedDashboard store={store} />);
    expect(container).toBeTruthy();
  });

  it('retrieves users', () => {
    render(<Dashboard {...props} />);
    expect(props.getUsers).toBeCalledTimes(1);
  });

  it('changes maxPerPage', () => {
    const { getByTestId } = render(<Dashboard {...propsWithUsers} />);

    act(() => {
      fireEvent.change(getByTestId('select-max-per-page'), {
        target: { value: '10' },
      });
    });

    expect(getByTestId('select-max-per-page').value).toEqual('30');

    act(() => {
      fireEvent.change(getByTestId('select-max-per-page'), {
        target: { value: '100' },
      });
    });

    expect(getByTestId('select-max-per-page').value).toEqual('100');
  });

  it('filters data', () => {
    const { getByTestId, container } = render(
      <Dashboard {...propsWithUsers} />,
    );

    act(() => {
      fireEvent.change(getByTestId('search-input'), {
        target: { value: 'Loutitia' },
      });
    });

    expect(container.getElementsByTagName('tr')).toHaveLength(2);
    expect(getByTestId('suggestions')).toHaveTextContent('Loutitia');

    act(() => {
      fireEvent.change(getByTestId('search-input'), { target: { value: '' } });
    });
    expect(getByTestId('suggestions')).not.toHaveTextContent('Loutitia');

    act(() => {
      fireEvent.change(getByTestId('search-input'), { target: { value: 'L' } });
    });
    expect(getByTestId('suggestions')).not.toHaveTextContent('Loutitia');
  });
});
