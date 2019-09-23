import moment from 'moment';
import React from 'react';
import { Box, Heading } from 'rebass';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { sortBy, uniqBy } from 'lodash';
import { UserModel } from '../../store/user/user.model';

interface PeopleByIndustryProps {
  data: UserModel[];
}

const PeopleByDOB: React.FC<PeopleByIndustryProps> = ({ data }) => {
  const customData = sortBy(
    data.map(d => ({
      ...d,
      decade:
        Math.floor(moment(d.date_of_birth, 'DD/MM/YYYY').year() / 10) * 10,
    })),
    ['decade'],
  );
  const peopleByDOB = uniqBy(
    customData.map(d => ({ decade: d.decade, value: 0 })),
    'decade',
  );
  customData.forEach(d => {
    const row: any = peopleByDOB.find(p => p.decade === d.decade);
    if (row) row.value += 1;
  });

  return (
    <Box>
      <Heading fontSize={[2, 3, 4]}>People by Decade</Heading>
      <BarChart
        width={500}
        height={400}
        data={peopleByDOB}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="decade" name="People by DOB" />
        <YAxis />
        <Tooltip />
        <Bar stackId="a" dataKey="value" fill="mediumblue" />
      </BarChart>
    </Box>
  );
};

export default PeopleByDOB;
