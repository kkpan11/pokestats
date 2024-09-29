// types
import type { PokestatsItemPageProps } from '@/pages/item/[itemName]';
// helpers
import { findEnglishName } from '@/helpers';
import { usePlausible } from 'next-plausible';
// components
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import Image from 'next/image';
import ItemEffects from './ItemEffects';
import LanguageTable from '../LanguageTable';
import ItemFlavorText from './ItemFlavorText';
import CategoryItems from './CategoryItems';
import BerryDetailsTable from './BerryDetailsTable';
import Link from 'next/link';
import CustomButton from '../CustomButton';

const ItemPage = ({
  item,
  category,
  categoryItems,
  attributes,
  flingEffect,
  berryData,
}: PokestatsItemPageProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  return (
    <Stack gap={4}>
      <Stack>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Typography variant="pageHeading">{findEnglishName(item.names)}</Typography>
          {berryData && <Image src={item.sprite} alt={item.name} width={100} height={100} />}
        </Stack>
        <Typography variant="sectionSubTitle" gutterBottom>
          {item.shortEntry}
        </Typography>
        <Typography variant="sectionMessage" textAlign="left">
          {item.longEntry}
        </Typography>
      </Stack>
      <Grid2
        container
        spacing={4}
        direction={{ xxs: 'column-reverse', lg: 'row' }}
        size={12}
        wrap="nowrap"
      >
        <ItemDetails size={{ xxs: 12, lg: berryData ? 3 : 4 }} category={category} item={item} />
        <ItemEffects size={{ xxs: 12, lg: 5 }} attributes={attributes} flingEffect={flingEffect} />
        {berryData ? (
          <BerryDetailsTable size={{ xxs: 12, lg: 4 }} berry={berryData} />
        ) : (
          <Grid2 size={{ xxs: 12, lg: 4 }} alignItems="center" justifyContent="center">
            <Image src={item.sprite} alt={item.name} width={100} height={100} />
          </Grid2>
        )}
      </Grid2>
      <Divider />
      <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12} wrap="nowrap">
        <ItemFlavorText size={{ xxs: 12, lg: 9 }} flavorTexts={item.flavourTextEntries} />
        <LanguageTable size={{ xxs: 12, lg: 3 }} names={item.names} />
      </Grid2>
      <Divider />
      <CategoryItems category={category} categoryItems={categoryItems} />
      <Grid2 size={12}>
        <Link href="/items" passHref legacyBehavior>
          <CustomButton
            size="large"
            variant="contained"
            onClick={() => plausible('See All Items Click')}
          >
            See all items
          </CustomButton>
        </Link>
      </Grid2>
    </Stack>
  );
};

export default ItemPage;
