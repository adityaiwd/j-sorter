import { members } from '../membersData';
import { uniq } from 'lodash';
import { ACTIVE_STATUS, GRADUATED_STATUS, ALL_STATUS } from '../../constants';

export const checkFilteredAllGenerations = (memberStatus, generations) => {
  const allGenerationLength = uniq(members.map(member => member.generation)).length;
  const activeGenerationLength = uniq(
    members.filter(member => !member.graduated).map(member => member.generation),
  ).length;
  const graduatedGenerationLength = uniq(
    members.filter(member => member.graduated).map(member => member.generation),
  ).length;

  return (
    (memberStatus === ACTIVE_STATUS && generations.split('|').length === activeGenerationLength) ||
    (memberStatus === GRADUATED_STATUS && generations.split('|').length === graduatedGenerationLength) ||
    (memberStatus === ALL_STATUS && generations.split('|').length === allGenerationLength)
  );
};
