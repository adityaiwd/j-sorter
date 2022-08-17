import Dexie from 'dexie';

export const SortResult = new Dexie('SortResult');

SortResult.version(1).stores({
  members: '++id, name, picture, generation, graduated, score, matched',
  history: '++id, home, away, homeScore, awayScore',
});

const addToSortResult = async member => {
  await SortResult.members.add(member);
};

const addToHistory = async match => {
  await SortResult.history.add(match);
};

export const selectedMembers = async () => await SortResult.members.toArray();

export const bulkAddFilteredMembers = async members => {
  const withScoreAndMatched = members.map(member => ({...member, score: 0, matched: []}))
  await SortResult.members.bulkAdd(withScoreAndMatched);
};

export const updateMemberScore = async (member1, member2, increaseNumber1, increaseNumber2) => {
  await SortResult.members.update(member1.id, {
    score: member1.score + increaseNumber1,
    matched: [...member1.matched, member2.id],
  });
  await SortResult.members.update(member2.id, {
    score: member2.score + increaseNumber2,
    matched: [...member2.matched, member1.id],
  });
  addToHistory({ home: member1.id, away: member2.id, homeScore: increaseNumber1, awayScore: increaseNumber2 });
};

export const undoLastPick = async () => {
  const history = await SortResult.history.toArray()
  const lastPicked = history[history.length-1]
  await SortResult.history.where("id").equals(lastPicked.id).delete()
  const home = await SortResult.members.get(lastPicked.home)
  const away = await SortResult.members.get(lastPicked.away)
  await SortResult.members.update(home.id, {
    score: home.score - lastPicked.homeScore,
    matched: home.matched.slice(0,-1),
  });
  await SortResult.members.update(away.id, {
    score: away.score - lastPicked.awayScore,
    matched: away.matched.slice(0,-1),
  });
  
  const newHome = await SortResult.members.get(lastPicked.home)
  const newAway = await SortResult.members.get(lastPicked.away)
  return {newHome, newAway}
}
