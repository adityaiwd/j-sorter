import { members } from '../membersData';
import { uniqBy } from 'lodash';
import { ACTIVE_STATUS, GRADUATED_STATUS, MEMBERS_ONLY_STATUS, TRAINEE_ONLY_STATUS } from '../../constants';

export const getGenerationOptions = memberStatus => {
  switch (memberStatus) {
    case ACTIVE_STATUS:
      return uniqBy(
        members
          .filter(member => !member.graduated)
          .map(member => ({ value: member.generation, label: `Gen ${member.generation}` })),
        'value',
      );
    case MEMBERS_ONLY_STATUS:
      return uniqBy(
        members
          .filter(member => !member.graduated && !member.trainee)
          .map(member => ({ value: member.generation, label: `Gen ${member.generation}` })),
        'value',
      );
    case TRAINEE_ONLY_STATUS:
      return uniqBy(
        members
          .filter(member => !member.graduated && member.trainee)
          .map(member => ({ value: member.generation, label: `Gen ${member.generation}` })),
        'value',
      );
    case GRADUATED_STATUS:
      return uniqBy(
        members
          .filter(member => member.graduated)
          .map(member => ({ value: member.generation, label: `Gen ${member.generation}` })),
        'value',
      );
    default:
      return uniqBy(
        members.map(member => ({ value: member.generation, label: `Gen ${member.generation}` })),
        'value',
      );
  }
};
