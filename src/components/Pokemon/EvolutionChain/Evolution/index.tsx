import { useState, useEffect, useRef } from 'react';
// types
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies, ChainLink, EvolutionDetail } from 'pokenode-ts';
// helpers
import { PokemonClient } from 'pokenode-ts';
import { removeDash, mapGeneration, fadeInUpVariant } from '@/helpers';
// components
import Link from 'next/link';
import BoxWrapper from '@/components/Box/StyledBox';
import Image from '@/components/Image';
import EvolutionDetails from './EvolutionDetails';
// styles
import { PokeBox, NumberId, PokeName } from '@/components/BaseStyles';
import { EvoArrow, PokeGen } from './StyledEvolution';

interface EvolutionProps extends BoxProps {
  noArrow?: boolean;
  species: ChainLink['species'];
  evolutionDetails?: EvolutionDetail[];
}

const Evolution = ({
  noArrow = false,
  species,
  evolutionDetails,
  ...rest
}: EvolutionProps): JSX.Element => {
  // species state
  const [currSpecies, setCurrSpecies] = useState<PokemonSpecies>();
  const [imgSrc, setImgSrc] = useState<string>();
  // ref
  const _isMounted = useRef(null);
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
      setImgSrc(null);
    };
  }, []);

  // fetch species.url data
  useEffect(() => {
    // client
    const pokemonClient = new PokemonClient();
    async function fetchImage() {
      // get species data
      await pokemonClient.getPokemonSpeciesByName(species.name).then(newSpecies => {
        // only update states if mounted
        if (_isMounted.current) {
          setCurrSpecies(newSpecies);
          setImgSrc(
            `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${newSpecies.id
              .toString()
              .padStart(3, '0')}.png`,
          );
        }
      });
    }
    // fetch if mounted
    if (_isMounted.current && species) fetchImage();
  }, [species]);

  return (
    currSpecies &&
    imgSrc && (
      <BoxWrapper
        flexdirection={{ xxs: 'column', lg: 'row' }}
        flexalign="center"
        width={{ xxs: 'auto', lg: '100%' }}
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key={`evo-details-container-${species.name}`}
        {...rest}
      >
        {/** Arrow with evolution details */}
        {!noArrow && (
          <BoxWrapper
            width="auto"
            $flexgrow
            flexdirection="column"
            flexwrap="nowrap"
            flexjustify="center"
            flexalign="center"
          >
            {evolutionDetails.map((currDetails, i) => (
              <EvolutionDetails key={`evo-details-${i}`} details={currDetails} />
            ))}
            <EvoArrow />
          </BoxWrapper>
        )}
        {/** Pokemon box with image and types */}
        <Link as={`/pokemon/${species.name}`} href="/pokemon/[pokemonId]" passHref>
          <PokeBox
            $dark
            whileHover="hover"
            whileTap="tap"
            variants={fadeInUpVariant}
            key={`evolution-${species.name}`}
          >
            <Image
              alt={species.name}
              key={`evolution-img-${species.name}-${imgSrc}`}
              src={imgSrc}
              width="115"
              height="115"
              lazy={false}
            />
            <NumberId>{`#${currSpecies.id}`}</NumberId>
            <PokeName>{removeDash(currSpecies.name)}</PokeName>
            {currSpecies.generation.name && (
              <PokeGen>{mapGeneration(currSpecies.generation.name)}</PokeGen>
            )}
          </PokeBox>
        </Link>
      </BoxWrapper>
    )
  );
};

export default Evolution;
