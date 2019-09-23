import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Box, Flex, Heading } from 'rebass';

import Table, { DataType, TableHeader } from './table';
import { GetUsers } from '../../store/user/user.action';
import { UserState } from '../../store/user/user.reducer';

interface DashboardProps {
  getUsers: () => void;
  userState: UserState;
}

export const Dashboard: React.FC<DashboardProps> = ({
  getUsers,
  userState,
}) => {
  const [maxPerPage, setMaxPerPage] = useState(50);
  const [suggestions, setSuggestions] = useState();
  const [users, setUsers] = useState();

  function filterData(search: string) {
    if (search) {
      const filteredUsers = userState.users.filter((u: any) => {
        const name = `${u.first_name} ${u.last_name}`.toLowerCase();
        return name.includes(search.toLowerCase());
      });
      if (search.length >= 2)
        setSuggestions(
          filteredUsers
            .map((u: any) =>
              `${u.first_name || ''} ${u.last_name || ''}`.trim(),
            )
            .slice(0, 15),
        );
      else setSuggestions([]);

      setUsers(filteredUsers);
    } else {
      setUsers(userState.users as any);
      setSuggestions([]);
    }
  }

  useMemo(() => {
    if (userState) setUsers(userState.users);
  }, [userState]);

  useEffect(() => {
    if (userState && isEmpty(userState.users)) getUsers();
  }, [userState]);

  const headers: TableHeader[] = [
    { key: 'id', title: 'Id' },
    { key: 'first_name', title: 'First name' },
    { key: 'last_name', title: 'Last name' },
    { key: 'email', title: 'Email' },
    { key: 'date_of_birth', title: 'Birthday', type: DataType.DATE },
    { key: 'industry', title: 'Industry' },
    { key: 'years_of_experience', title: 'Years of experience' },
  ];

  return (
    <>
      <Heading fontSize={[5, 6, 7]} color="primary">
        Dashboard
      </Heading>
      <Flex justifyContent="space-between">
        <Box>
          <datalist id="suggestions" data-testid="suggestions">
            {suggestions &&
              suggestions.map((s: any) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </datalist>
          <input
            data-testid="search-input"
            type="search"
            placeholder="Search a user. Ex: John Wick"
            list="suggestions"
            onChange={e => filterData(e.target.value)}
          />
        </Box>
        <Box>
          <select
            data-testid="select-max-per-page"
            defaultValue={`${maxPerPage}`}
            onChange={e => setMaxPerPage(parseInt(e.target.value, 10))}
          >
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </Box>
      </Flex>
      <Table
        customEmptyMessage="No users found."
        data={users || []}
        headers={headers}
        maxPerPage={maxPerPage}
        loading={userState && userState.loading}
      />
    </>
  );
};

const mapStateToProps = (state: { userReducer: any }) => ({
  userState: state.userReducer,
});

const mapDispatchToProps = {
  getUsers: GetUsers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
