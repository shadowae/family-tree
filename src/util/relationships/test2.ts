import type RelationshipFunctionType from '../../type/RelationshipFunctionType';
import getMother from './getMother';
import getFather from './getFather';
import getSpouse from './getSpouse';
import getChildren from './getChildren';
import getSiblings from './getSiblings';
import getSons from './getSons';
import getDaughters from './getDaughters';
import getBrothers from './getBrothers';
import getSisters from './getSisters';
import getCousins from './getCousins';
import getSisterInLaw from './getSisterInLaw';
import getBrotherInLaw from './getBrotherInLaw';
import getPaternalUncles from './getPaternalUncles';
import getMaternalUncles from './getMaternalUncles';
import getPaternalAunts from './getPaternalAunts';
import getMaternalAunts from './getMaternalAunts';
import getGranddaughters from './getGranddaughters';

const relationships: RelationshipFunctionType = {
	father: getFather,
	mother: getMother,
	spouse: getSpouse,
	children: getChildren,
	siblings: getSiblings,
	son: getSons,
	daughter: getDaughters,
	brother: getBrothers,
	sister: getSisters,
	cousins: getCousins,
	'sister-in-law': getSisterInLaw,
	'brother-in-law': getBrotherInLaw,
	'paternal uncle': getPaternalUncles,
	'maternal uncle': getMaternalUncles,
	'paternal aunt': getPaternalAunts,
	'maternal aunt': getMaternalAunts,
	'grand daughter': getGranddaughters,
};

export default relationships;
