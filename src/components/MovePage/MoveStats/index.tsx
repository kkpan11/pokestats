// types
import type { Move } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers';
// styles
import { Table } from '@/BaseStyles';
// components
import type { Grid2Props } from '@mui/material';
import { Box, capitalize, Grid2, Typography } from '@mui/material';

interface MoveStatsProps extends Grid2Props {
  move: Move;
  moveName: string;
}

const MoveStats = ({ move, moveName, ...rest }: MoveStatsProps): JSX.Element => {
  // data
  const { name, stat_changes } = move;

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={1}
      {...rest}
    >
      <Typography variant="sectionTitle">Stat Changes</Typography>
      {stat_changes?.length > 0 ? (
        <Box component={Table} maxWidth="300px">
          <tbody>
            {stat_changes.map(({ change, stat }, i) => (
              <tr key={`stat-change-${name}-${stat.name}-${i}`}>
                <th>{capitalize(removeDash(stat.name))}</th>
                <td>{change}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      ) : (
        <Typography>
          <Typography fontWeight="600" component="span">
            {moveName}
          </Typography>
          {` doesn't affect any stats when used.`}
        </Typography>
      )}
    </Grid2>
  );
};

export default MoveStats;
