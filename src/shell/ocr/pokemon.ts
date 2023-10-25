import { TabbedScreen } from '../routes';
import { IPokemon } from '../../common/store/types';
import { ScanResult } from './types';
import {
  TextRecognitionResult,
  TextBlock,
} from '@react-native-ml-kit/text-recognition';
import { NativeModules } from 'react-native';
import { MainSkillID, MainSkills } from '../../gameData/skills/mainSkills';
import { extractText, sortTextBlocksIntoRows } from './helpers';
import { Pokemon, PokemonID } from '../../gameData/pokemon/pokemon';
import { SubSkillID, SubSkills } from '../../gameData/skills/subSkills';
import { NatureID, Natures } from '../../gameData/natures/natures';

function extractLevel(textBlock: TextBlock) {
  const match = textBlock.text.match('Lv\\.\\s*(\\d+)');
  if (match) {
    const result = parseInt(match[1]);
    if (!isNaN(result)) {
      return result;
    }
  }
}

export function parsePokemon(
  result: TextRecognitionResult,
): ScanResult | undefined {
  const pokemon: Partial<IPokemon> = {};
  const rows = sortTextBlocksIntoRows(result.blocks);

  let name: string | undefined;
  const pokemonMap: { [key: string]: PokemonID } = {};
  for (const pokemonID of Object.keys(Pokemon) as PokemonID[]) {
    pokemonMap[Pokemon[pokemonID].name] = pokemonID;
  }
  rows.forEach(row => {
    const split = extractText(row.blocks[0]).split(' ');
    if (split.length !== 3) {
      return;
    }
    const match = split[0] + split[1].match('Lv\\.(d+)');
    if (!match) {
      return;
    }

    if (split[2] in pokemonMap) {
      pokemon.level = parseInt(split[1]);
      pokemon.speciesID = pokemonMap[split[2]];
      name = split[2];
      return;
    }
  });

  const mainSkillMap: { [key: string]: MainSkillID } = {};
  for (const mainSkillID of Object.keys(MainSkills) as MainSkillID[]) {
    mainSkillMap[MainSkills[mainSkillID].name.toLowerCase()] = mainSkillID;
  }
  let mainSkill: MainSkillID | undefined;
  rows.forEach(row => {
    if (row.blocks.length !== 2) {
      return;
    }
    if (
      extractText(row.blocks[0]).toLowerCase() in mainSkillMap &&
      extractLevel(row.blocks[1])
    ) {
      mainSkill = mainSkillMap[extractText(row.blocks[0])];
      pokemon.baseMainSkillLevel = extractLevel(row.blocks[1]);
    }
  });

  const subSkillMap: { [key: string]: SubSkillID } = {};
  for (const subSkillID of Object.keys(SubSkills) as SubSkillID[]) {
    subSkillMap[SubSkills[subSkillID].name] = subSkillID;
  }
  const subSkillRows = rows
    .filter(
      row =>
        row.blocks.length > 0 &&
        row.blocks.find(block => extractText(block) in subSkillMap),
    )
    .map(row => ({
      ...row,
      blocks: row.blocks.filter(block => extractText(block) in subSkillMap),
    }));

  if (subSkillRows.length === 3) {
    pokemon.subskills = [
      subSkillMap[extractText(subSkillRows[0].blocks[0])],
      subSkillMap[extractText(subSkillRows[0].blocks[1])],
      subSkillMap[extractText(subSkillRows[1].blocks[0])],
      subSkillMap[extractText(subSkillRows[1].blocks[1])],
      subSkillMap[extractText(subSkillRows[2].blocks[0])],
    ];
  }

  const natureMap: { [key: string]: NatureID } = {};
  for (const natureID of Object.keys(Natures) as NatureID[]) {
    natureMap[Natures[natureID].name] = natureID;
  }
  const natureRow = rows.find(
    row => row.blocks.length > 2 && extractText(row.blocks[1]) in Natures,
  );
  if (natureRow) {
    pokemon.nature = natureMap[extractText(natureRow.blocks[1])];
  }

  if (Object.keys(pokemon).length > 3) {
    NativeModules.Scanner.showToast(`Identified ${name ?? 'Pokemon'}!`);
    return {
      screen: TabbedScreen.PokemonBox,
      pokemon,
    };
  } else {
    NativeModules.Scanner.showToast('Scan failed...');
    return undefined;
  }
}
