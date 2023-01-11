import { useState, useEffect, useContext, useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { removeDash } from '@/helpers/typography';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';

interface TrainingProps extends BoxProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const Training = ({ pokemon, species, ...rest }: TrainingProps): JSX.Element => {
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // data
  const { stats, base_experience, held_items } = pokemon;
  const { capture_rate, base_happiness, growth_rate } = species;
  // held items
  const [items, setItems] = useState([]);
  // memo
  const EVYield = useMemo(
    () =>
      stats.map(
        (currStat, i) =>
          currStat.effort > 0 && (
            <Numbered key={`${currStat.stat.name}-${i}`}>{`${currStat.effort} ${removeDash(
              currStat.stat.name,
            )}`}</Numbered>
          ),
      ),
    [stats],
  );
  const catchRate = useMemo(
    () => (
      <>
        {capture_rate}
        <Numbered light>{`( ${Math.round(
          (33.33 / 255) * capture_rate,
        )}% with pokeball, full HP )`}</Numbered>
      </>
    ),
    [capture_rate],
  );
  const baseHappiness = useMemo(() => {
    let happinessRate: string;

    if (base_happiness <= 69) happinessRate = 'Lower than normal';
    if (base_happiness === 70) happinessRate = 'Normal';
    if (base_happiness >= 71 && base_happiness <= 139) happinessRate = 'Higher than normal';
    if (base_happiness >= 140) happinessRate = 'Very high';

    return `${base_happiness} ( ${happinessRate} )`;
  }, [base_happiness]);

  useEffect(() => {
    if (held_items?.length && gameVersion) {
      // filter items with current version
      const versionItems = held_items
        .map(({ item, version_details }) => {
          const filteredVersions = version_details.filter(
            ({ version }) => version.name === gameVersion,
          );
          // organize item info
          if (filteredVersions.length > 0) {
            return {
              item_details: item,
              version_details: filteredVersions[0],
            };
          }
          return null;
        })
        .filter(currItem => currItem);
      // set items state
      setItems(versionItems);
    }
  }, [gameVersion, held_items]);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <SectionTitle>Training</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>EV Yield</th>
            <td>{EVYield}</td>
          </tr>
          <tr>
            <th>Catch Rate</th>
            <td>{catchRate}</td>
          </tr>
          <tr>
            <th>Base Happiness</th>
            <td>{baseHappiness}</td>
          </tr>
          <tr>
            <th>Base Exp.</th>
            <td>{base_experience}</td>
          </tr>
          <tr>
            <th>Growth Rate</th>
            <td>{removeDash(growth_rate.name)}</td>
          </tr>
          <tr>
            <th>Held Items</th>
            <td>
              {!items.length
                ? 'None'
                : items.map((item, i) => (
                    <Numbered key={`${item.item_details.name}-${i}`}>
                      {`${items.length > 1 ? `${i + 1}. ` : ``}${removeDash(
                        item.item_details.name,
                      )} ( ${item.version_details.rarity}% chance )`}
                    </Numbered>
                  ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default Training;
