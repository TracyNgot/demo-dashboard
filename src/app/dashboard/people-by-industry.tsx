import React from 'react';
import { uniqBy } from 'lodash';
import { Box, Heading } from 'rebass';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
} from 'recharts';

import { UserModel } from '../../store/user/user.model';

interface PeopleByIndustryProps {
  data: UserModel[];
}

const PeopleByIndustry: React.FC<PeopleByIndustryProps> = ({ data }) => {
  const peopleByIndustry = uniqBy(
    data.map(d => ({ industry: d.industry || 'Other', value: 0 })),
    'industry',
  );
  data.forEach(d => {
    const row: any = peopleByIndustry.find(p => p.industry === d.industry);
    if (row) row.value += 1;
  });

  return (
    <Box>
      <Heading fontSize={[2, 3, 4]}>People by Industry</Heading>
      <BarChart
        width={500}
        height={400}
        data={peopleByIndustry}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="industry" />
        <YAxis />
        <Tooltip />
        <Brush dataKey="industry" height={30} stroke="#8884d8" />
        <Bar stackId="a" dataKey="value" fill="mediumblue" />
      </BarChart>
    </Box>
  );
};

export default PeopleByIndustry;
