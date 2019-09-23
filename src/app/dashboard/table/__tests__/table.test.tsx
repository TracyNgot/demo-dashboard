import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Table, { TableProps } from '..';

describe('Table', () => {
  const props: TableProps = {
    data: [
      { test: 'Oliver', id: '1' },
      { test: 'Laura', id: '2' },
      { test: 'Alfred', id: '3' },
    ],
    headers: [{ key: 'test', title: 'Test' }],
    loading: false,
    maxPerPage: 2,
  };

  const propsWithoutData = {
    ...props,
    headers: [],
    data: [],
  };

  it('renders without crashing', () => {
    render(
      <Router>
        <Table {...props} />
      </Router>,
    );
  });

  it('shows empty message when no data', () => {
    const { getByTestId } = render(<Table {...propsWithoutData} />);

    expect(getByTestId('empty')).toBeDefined();
  });

  it('shows loading spinner when loading', () => {
    const { getByTestId, container } = render(
      <Table {...propsWithoutData} loading />,
    );

    expect(getByTestId('loading')).toBeDefined();
    expect(container).not.toHaveTextContent('Ok');
  });

  it('sorts data by header', () => {
    const { getByTestId } = render(<Table {...props} />);
    const headerTest = getByTestId('test');

    act(() => {
      fireEvent.click(headerTest);
    });

    expect(getByTestId('row-0')).toHaveTextContent('Alfred');

    act(() => {
      fireEvent.click(headerTest);
    });

    expect(getByTestId('row-0')).toHaveTextContent('Oliver');
  });

  it('paginates', () => {
    const { getByTestId } = render(<Table {...props} />);

    act(() => {
      fireEvent.click(getByTestId('next-btn'));
    });

    expect(getByTestId('row-0')).toHaveTextContent('Alfred');

    act(() => {
      fireEvent.click(getByTestId('previous-btn'));
    });

    expect(getByTestId('row-0')).toHaveTextContent('Oliver');
  });
});
