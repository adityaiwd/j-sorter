import { members } from "../membersData"
import { uniqBy } from "lodash"
import { ACTIVE_STATUS, GRADUATED_STATUS } from '../../constants';

export const getGenerationOptions = (memberStatus) => {
    if(memberStatus === ACTIVE_STATUS){
        return uniqBy(members.filter(member => !member.graduated).map(member => ({ value: member.generation, label: `Gen ${member.generation}` })), 'value')
    } else if (memberStatus === GRADUATED_STATUS) {
        return uniqBy(members.filter(member => member.graduated).map(member => ({ value: member.generation, label: `Gen ${member.generation}` })), 'value')
    }
    return uniqBy(members.map(member => ({ value: member.generation, label: `Gen ${member.generation}` })), 'value')
}