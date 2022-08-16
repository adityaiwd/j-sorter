import { members } from './membersData';

const filterByGenerations = (members, generations) => {
  return members.filter(member => generations.some(generation => member.generation === generation));
};

export const filteredMembers = (memberStatus, generations) => {
  let byStatus = [];
  switch (memberStatus) {
    case 1:
      byStatus = members.filter(member => member.graduated === false);
      return filterByGenerations(byStatus, generations);
    case 2:
      byStatus = members.filter(member => member.graduated === true);
      if (generations.length === 10) {
        return byStatus;
      }
      return filterByGenerations(byStatus, generations);
    case 3:
      if (generations.length === 10) {
        return members;
      }
      return filterByGenerations(members, generations);
  }
};
