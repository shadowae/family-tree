import type RelationshipFunctionType from '../../type/RelationshipFunctionType';
import RelationshipType from '../../constants/relationshipsType';
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
	[RelationshipType.Father]: getFather,
	[RelationshipType.Mother]: getMother,
	[RelationshipType.Spouse]: getSpouse,
	[RelationshipType.Children]: getChildren,
	[RelationshipType.Siblings]: getSiblings,
	[RelationshipType.Son]: getSons,
	[RelationshipType.Daughter]: getDaughters,
	[RelationshipType.Brother]: getBrothers,
	[RelationshipType.Sister]: getSisters,
	[RelationshipType.Cousins]: getCousins,
	[RelationshipType.SisterInLaw]: getSisterInLaw,
	[RelationshipType.BrotherInLaw]: getBrotherInLaw,
	[RelationshipType.PaternalUncle]: getPaternalUncles,
	[RelationshipType.MaternalUncle]: getMaternalUncles,
	[RelationshipType.PaternalAunt]: getPaternalAunts,
	[RelationshipType.MaternalAunt]: getMaternalAunts,
	[RelationshipType.GrandDaughter]: getGranddaughters,
};

export default relationships;
