import styled from '@emotion/styled';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { isEmpty, sortBy } from 'lodash';
import { Box, Button, Flex } from 'rebass';

import PeopleByDOB from '../people-by-dob';
import PeopleByIndustry from '../people-by-industry';

const Pagination = styled(Box)``;

export enum DataType {
  TEXT,
  DATE,
}

export interface TableHeader {
  key: string;
  title: string;
  type?: DataType;
}

export interface TableProps {
  data: any[];
  headers: TableHeader[];
  loading: boolean;
  maxPerPage: number;
  customEmptyMessage?: string;
}

const Table: React.FC<TableProps> = ({
  data,
  customEmptyMessage,
  headers,
  loading,
  maxPerPage,
}) => {
  const [sortedData, setSortedData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentSortKey, setCurrentSortKey] = useState();
  const [ascendingEnabled, setAscendingEnabled] = useState(true);

  function sort(key: string) {
    if (currentSortKey !== key) {
      setCurrentSortKey(key);
      setAscendingEnabled(true);
    }

    if (ascendingEnabled) {
      setSortedData(sortBy(data, [key]));
      setAscendingEnabled(false);
    } else {
      setSortedData(sortBy(data, [key]).reverse());
      setAscendingEnabled(true);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfPages(Math.round(sortedData.length / maxPerPage));
  }, [sortedData, maxPerPage]);

  useMemo(() => {
    setSortedData(data);
  }, [data]);

  if (loading && isEmpty(data)) return <p data-testid="loading">Loading</p>;
  if (isEmpty(data)) return <p data-testid="empty">{customEmptyMessage}</p>;

  return (
    <Box width={[1]}>
      <p>{sortedData.length} results.</p>
      <table>
        <thead>
          <tr>
            {headers &&
              headers.map(h => (
                <th
                  key={h.key}
                  data-testid={h.key}
                  onClick={() => sort(h.key)}
                  data-active={currentSortKey === h.key}
                >
                  {h.title}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData
              .slice(maxPerPage * (currentPage - 1), maxPerPage * currentPage)
              .map((d, index) => (
                <tr key={index} data-testid={`row-${index}`}>
                  {headers &&
                    headers.map(h => (
                      <td key={`${d.id}-${h.key}`}>
                        {h.type === DataType.DATE
                          ? moment(d[h.key], 'DD/MM/YYYY').format('DD/MM/YYYY')
                          : d[h.key]}
                      </td>
                    ))}
                </tr>
              ))}
        </tbody>
      </table>
      <p>
        Page {currentPage} of {numberOfPages}
      </p>
      <Pagination>
        <Button
          data-testid="previous-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          data-testid="next-btn"
          disabled={currentPage === numberOfPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Pagination>

      <Flex>
        <PeopleByDOB data={sortedData} />
        <PeopleByIndustry data={sortedData} />
      </Flex>
    </Box>
  );
};

export default Table;
