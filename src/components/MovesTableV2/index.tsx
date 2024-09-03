import { useMemo, useCallback } from 'react';
// hooks
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
// types
import type { Move, MoveLearnMethod } from 'pokenode-ts';
// helpers
import { removeDash, mapGeneration, FilteredMove } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// styles
import { Stack, TableProps, Theme, Typography } from '@mui/material';
// components
import { AnimatePresence, motion } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import CustomTable from '@/components/CustomTable';

interface TypeMovesProps extends TableProps {
  moves: (FilteredMove | Move)[];
  learnMethod?: MoveLearnMethod['name'];
  machineNames?: string[];
}

const MovesTableV2 = ({
  moves,
  learnMethod,
  machineNames,
  ...rest
}: TypeMovesProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  const mapMethodName = useMemo(() => {
    switch (learnMethod) {
      case 'level-up':
        return 'Level';
      case 'machine':
        return 'Machine';
      default:
        return '-';
    }
  }, [learnMethod]);

  const onCellClick = useCallback(
    (moveName: Move['name'], id: Move['id']) => {
      if (id <= 850) {
        plausible('Move Table Click');
        router.push(`/move/${moveName}`);
      }
    },
    [plausible, router],
  );

  // Define the columns for DataTable
  const columns = useMemo(() => {
    const baseColumns = [
      { field: 'name', headerName: 'Name' },
      { field: 'type', headerName: 'Type' },
      { field: 'category', headerName: 'Category' },
      { field: 'power', headerName: 'Power' },
      { field: 'pp', headerName: 'PP' },
      { field: 'accuracy', headerName: 'Accuracy' },
      { field: 'priority', headerName: 'Priority' },
      { field: 'generation', headerName: 'Generation' },
    ];

    // Add dynamic column for learn method
    if (learnMethod) {
      return [{ field: 'method', headerName: mapMethodName }, ...baseColumns];
    }
    return baseColumns;
  }, [learnMethod, mapMethodName]);

  // Transform data for DataTable
  const tableData = useMemo(() => {
    return moves.map((move, index) => {
      // Render move cell dynamically based on learn method
      const methodCellContent = (() => {
        if (!learnMethod) return '-';

        switch (learnMethod) {
          case 'level-up':
            // @ts-expect-error: incorrect types
            return move?.level_learned_at || '-';
          case 'machine':
            return machineNames && machineNames[index] ? (
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                width="75%"
                margin="0 auto"
                gap={0.2}
              >
                <span>{machineNames[index].toUpperCase()}</span>
                <img
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${machineNames[index].includes('hm') ? 'hm' : 'tm'}/${move.type.name}.png`}
                  alt={move.type.name}
                  width="30"
                />
              </Stack>
            ) : (
              '-'
            );
          default:
            return '-';
        }
      })();

      return {
        method: methodCellContent,
        name: (
          <Typography onClick={() => onCellClick(move.name, move.id)} textTransform="capitalize">
            {removeDash(move.name)}
          </Typography>
        ),
        type: <TypeBadge $iconOnly $typename={move.type.name as keyof Theme['palette']['types']} />,
        category: (
          <Typography textTransform="capitalize" onClick={() => onCellClick(move.name, move.id)}>
            {move.damage_class?.name}
          </Typography>
        ),
        power: move.power || '-',
        pp: move.pp || '-',
        accuracy: move.accuracy || '-',
        priority: move.priority,
        generation: mapGeneration(move.generation?.name) || '-',
      };
    });
  }, [moves, learnMethod, machineNames, onCellClick]);

  return (
    <AnimatePresence mode="wait">
      {moves.length > 0 ? (
        <CustomTable columns={columns} data={tableData} key="moves-table-container" {...rest} />
      ) : (
        <Typography
          variant="sectionMessage"
          component={motion.p}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="type-nomoves-message"
        >
          No moves for current type.
        </Typography>
      )}
    </AnimatePresence>
  );
};

export default MovesTableV2;
