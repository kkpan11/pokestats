// helpers
import { removeDash, prefixId } from '@/helpers';
// animations
import { hoverVariant } from '@/animations';
// components
import { BtnContainer, BtnAnchor, Title, Arrow } from './StyledNavigation';
import ImageNext from '@/components/ImageNext';
import { Typography } from '@mui/material';

export interface NavigationButtonProps {
  pokemonName: string;
  pokemonId: number;
  direction: 'left' | 'right';
  handleClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  pokemonName,
  pokemonId,
  direction,
  handleClick,
}) => (
  <BtnContainer
    whileHover="hover"
    whileTap="tap"
    variants={hoverVariant}
    key={`${direction}-pokemon-${pokemonName}`}
  >
    <BtnAnchor href={`/pokemon/${pokemonName}`} onClick={handleClick} direction={direction}>
      <Arrow direction={direction}>
        <ImageNext
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
            direction === 'left' ? pokemonId - 1 : pokemonId + 1,
          )}.png`}
          alt={pokemonName}
          key={`navigation-${direction}-${pokemonName}`}
          width="100"
        />
      </Arrow>
      <Title>
        <Typography
          variant="h4"
          component="span"
        >{`#${direction === 'left' ? pokemonId - 1 : pokemonId + 1}`}</Typography>
        <Typography textTransform="capitalize" variant="subtitle2" component="span">
          {removeDash(pokemonName)}
        </Typography>
      </Title>
    </BtnAnchor>
  </BtnContainer>
);

export default NavigationButton;
