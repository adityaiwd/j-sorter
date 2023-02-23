import { members } from '../membersData';
import { uniq } from 'lodash';
import { ACTIVE_STATUS, GRADUATED_STATUS, ALL_STATUS, MEMBERS_ONLY_STATUS, TRAINEE_ONLY_STATUS } from '../../constants';

export const checkFilteredAllGenerations = (memberStatus, generations) => {
  const allGenerationLength = uniq(members.map(member => member.generation)).length;
  const activeGenerationLength = uniq(
    members.filter(member => !member.graduated).map(member => member.generation),
  ).length;
  const membersOnlyGenerationLength = uniq(
    members.filter(member => !member.graduated && !member.trainee).map(member => member.generation),
  ).length;
  const traineeOnlyGenerationLength = uniq(
    members.filter(member => !member.graduated && member.trainee).map(member => member.generation),
  ).length;
  const graduatedGenerationLength = uniq(
    members.filter(member => member.graduated).map(member => member.generation),
  ).length;

  return (
    (memberStatus === ACTIVE_STATUS && generations.split('|').length === activeGenerationLength) ||
    (memberStatus === MEMBERS_ONLY_STATUS && generations.split('|').length === membersOnlyGenerationLength) ||
    (memberStatus === TRAINEE_ONLY_STATUS && generations.split('|').length === traineeOnlyGenerationLength) ||
    (memberStatus === GRADUATED_STATUS && generations.split('|').length === graduatedGenerationLength) ||
    (memberStatus === ALL_STATUS && generations.split('|').length === allGenerationLength)
  );
};
