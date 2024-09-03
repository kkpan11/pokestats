// types
import type { PokestatsTypePageProps } from '@/pages/type/[typeId]';
// helpers
import { findEnglishName } from '@/helpers';
// components
import TypeInfo from './Info';
import TypeRelations from './Relations';
import TypeIcon from './TypeIcon';
import Tabs from './Tabs';
// styles
import { Divider, Grid2, Stack, Theme, Typography } from '@mui/material';

export type TypePageProps = Omit<PokestatsTypePageProps, 'autocompleteList'>;

const TypePage = ({ typeData }: TypePageProps): JSX.Element => {
  // data
  const { name, names, damage_relations } = typeData;

  const typeName = findEnglishName(names);

  return (
    <Stack divider={<Divider />} gap={4} py={2}>
      <Grid2 container spacing={4} direction="column">
        <Grid2>
          <Typography variant="pageHeading">{typeName}</Typography>
        </Grid2>
        <Grid2 container spacing={2} direction={{ xxs: 'column-reverse', lg: 'row' }} size={12}>
          <Grid2 size={{ xxs: 12, lg: 3 }}>
            <TypeInfo type={typeData} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 6 }}>
            <TypeRelations relations={damage_relations} />
          </Grid2>
          <Grid2 size={{ xxs: 12, lg: 3 }}>
            <TypeIcon typeName={name as keyof Theme['palette']['types']} otherNames={names} />
          </Grid2>
        </Grid2>
      </Grid2>
      <Tabs typeData={typeData} typeName={typeName as keyof Theme['palette']['types']} />
    </Stack>
  );
};

export default TypePage;
