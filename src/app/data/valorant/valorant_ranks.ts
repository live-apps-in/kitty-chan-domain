export const VALORANT_RANK = [
  'Unranked',
  'Iron',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Ascendant',
  'Immortal',
  'Radiant',
  'Dummy', ///Mock - testing
];

export enum VALORANT_RANK_ROLES {
  Unranked = '1035936823974842459',
  Iron = '1035901587433984031',
  Bronze = '1035901947611451423',
  Silver = '1035902127584837742',
  Gold = '1035902107791929386',
  Platinum = '1035902116318957578',
  Diamond = '1035902445001375786',
  Ascendant = '1035902526781931550',
  Immortal = '1035902507366498375',
  Radiant = '1035902742553710602',
  Dummy = '1035925777427992606', ///Mock - testing
}

export const VALORANT_RANK_MATCH = {
  Unranked: ['Unranked', 'Iron', 'Bronze'],
  Iron: ['Unranked', 'Iron', 'Bronze'],
  Bronze: ['Unranked', 'Iron', 'Bronze', 'Silver'],
  Silver: ['Iron', 'Bronze', 'Silver', 'Gold'],
  Gold: ['Silver', 'Gold', 'Platinum'],
  Platinum: ['Gold', 'Platinum', 'Diamond'],
  Diamond: ['Platinum', 'Diamond', 'Immortal'],
  Immortal: ['Diamond', 'Ascendant', 'Immortal'],
  Ascendant: ['Ascendant', 'Immortal', 'Radiant'],
  Radiant: ['Ascendant', 'Immortal', 'Radiant'],
  Dummy: ['Ascendant', 'Immortal', 'Radiant', 'Dummy'], ///Mock - testing
};
