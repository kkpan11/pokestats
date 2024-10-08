'use client';

import { memo, useMemo, useState } from 'react';
// types
import type { PokemonType } from 'pokenode-ts';
// helpers
import getMultipliers, { type MultipliersRes } from './damage_multipliers';
import { removeUnderscore } from '@/helpers';
import { track } from '@vercel/analytics';
// components
import TypeBadge from '@/components/TypeBadge';
import { Table } from '@/components/BaseStyles';
import type { Grid2Props, Theme } from '@mui/material';
import { Grid2, Stack, Switch, Tooltip, Typography } from '@mui/material';
// icons
import ShieldIcon from '@mui/icons-material/Shield';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

interface MultipliersProps extends Grid2Props {
  pokemonTypes: PokemonType[];
}

interface TypesTableProps {
  multipliers: MultipliersRes['attack'] | MultipliersRes['defense'];
  multiplierType: 'attack' | 'defense';
}

const TypesTable = memo(
  ({ multipliers, multiplierType }: TypesTableProps): JSX.Element => (
    <Table>
      <tbody>
        {Object.entries(multipliers).map(([relation, types]) => (
          <tr key={`${multiplierType}-${relation}`}>
            <Typography textTransform="capitalize" component="th">
              {removeUnderscore(relation)}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" component="td">
              {types.length === 0 ? (
                <Typography variant="body2">None</Typography>
              ) : (
                types.map(type => (
                  <TypeBadge
                    key={`${multiplierType}-${relation}-${type}`}
                    $typename={type as keyof Theme['palette']['types']}
                    $iconOnly
                  />
                ))
              )}
            </Stack>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
);

const Multipliers = ({ pokemonTypes, ...rest }: MultipliersProps): JSX.Element => {
  // states
  const [isAttackMode, setIsAttackMode] = useState(true);

  const currTypes = useMemo(() => pokemonTypes.map(currType => currType.type.name), [pokemonTypes]);

  const { attack: attackMultipliers, defense: defenseMultipliers } = useMemo(
    () => getMultipliers(currTypes),
    [currTypes],
  );

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAttackMode(event.target.checked);
    track('Pokemon Page - Relations Click');
  };

  return (
    <Grid2 flexDirection="column" gap={2} {...rest}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="sectionTitle">Relations</Typography>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Tooltip title="Defending" placement="top">
            <ShieldIcon />
          </Tooltip>
          <Switch
            checked={isAttackMode}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'Toggle attack/defense mode' }}
          />
          <Tooltip title="Attacking" placement="top">
            <ConnectWithoutContactIcon />
          </Tooltip>
        </Stack>
      </Stack>
      <TypesTable
        multipliers={isAttackMode ? attackMultipliers : defenseMultipliers}
        multiplierType={isAttackMode ? 'attack' : 'defense'}
      />
    </Grid2>
  );
};

export default Multipliers;
