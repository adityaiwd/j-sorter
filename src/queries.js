import { members } from './membersData';
import { uniq } from 'lodash';
import { ACTIVE_STATUS, GRADUATED_STATUS, ALL_STATUS, MEMBERS_ONLY_STATUS, TRAINEE_ONLY_STATUS } from '../constants';

const filterByGenerations = (members, generations) => {
  return members.filter(member => generations.some(generation => member.generation === generation));
};

export const filteredMembers = (memberStatus, generations) => {
  const allGenerationLength = uniq(members.map(member => member.generation)).length;
  let byStatus = [];
  switch (memberStatus) {
    case ACTIVE_STATUS:
      byStatus = members.filter(member => !member.graduated);
      return filterByGenerations(byStatus, generations);
    case MEMBERS_ONLY_STATUS:
      byStatus = members.filter(member => !member.graduated && !member.trainee);
      return filterByGenerations(byStatus, generations);
    case TRAINEE_ONLY_STATUS:
      byStatus = members.filter(member => !member.graduated && member.trainee);
      return filterByGenerations(byStatus, generations);
    case GRADUATED_STATUS:
      byStatus = members.filter(member => member.graduated);
      if (generations.length === allGenerationLength) {
        return byStatus;
      }
      return filterByGenerations(byStatus, generations);
    case ALL_STATUS:
      if (generations.length === allGenerationLength) {
        return members;
      }
      return filterByGenerations(members, generations);
  }
};
