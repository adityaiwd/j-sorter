import Dexie from 'dexie';

export const SortResult = new Dexie('SortResult');

SortResult.version(1).stores({
    members: '++id, name, picture, generation, graduated, score'
})

const addToSortResult = async(member) => {
    await SortResult.members.add(member)
}

export const selectedMembers = async() => await SortResult.members.toArray()

export const bulkAddFilteredMembers = async (members) => {
    console.log(members)
    await SortResult.members.bulkAdd(members)
}

export const updateMemberScore = async(member, increaseNumber) => {
    if(member.id) {
        await SortResult.members.update(member.id,{score: member.score + increaseNumber})
    } else {
        addToSortResult({...member, score: increaseNumber})
    }
}
