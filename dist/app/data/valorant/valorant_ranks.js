"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALORANT_RANK_MATCH = exports.VALORANT_RANK_ROLES = exports.VALORANT_RANK = void 0;
exports.VALORANT_RANK = [
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
    'Dummy' ///Mock - testing
];
var VALORANT_RANK_ROLES;
(function (VALORANT_RANK_ROLES) {
    VALORANT_RANK_ROLES["Unranked"] = "1035936823974842459";
    VALORANT_RANK_ROLES["Iron"] = "1035901587433984031";
    VALORANT_RANK_ROLES["Bronze"] = "1035901947611451423";
    VALORANT_RANK_ROLES["Silver"] = "1035902127584837742";
    VALORANT_RANK_ROLES["Gold"] = "1035902107791929386";
    VALORANT_RANK_ROLES["Platinum"] = "1035902116318957578";
    VALORANT_RANK_ROLES["Diamond"] = "1035902445001375786";
    VALORANT_RANK_ROLES["Ascendant"] = "1035902526781931550";
    VALORANT_RANK_ROLES["Immortal"] = "1035902507366498375";
    VALORANT_RANK_ROLES["Radiant"] = "1035902742553710602";
    VALORANT_RANK_ROLES["Dummy"] = "1035925777427992606"; ///Mock - testing
})(VALORANT_RANK_ROLES = exports.VALORANT_RANK_ROLES || (exports.VALORANT_RANK_ROLES = {}));
exports.VALORANT_RANK_MATCH = {
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
