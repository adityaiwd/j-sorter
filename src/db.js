import Dexie from 'dexie';

export const SortResult = new Dexie('SortResult');

SortResult.version(1).stores({
  members: 'id, name, picture, generation, graduated, score',
  matches: 'id, home, away, homeScore, awayScore',
});

export const selectedMembers = async () => await SortResult.members.toArray();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const bulkAddFilteredMembers = async members => {
  const membersWithId = members.map((member, index) => ({ ...member, id: index + 1, score: 0 }));
  const matches = membersWithId.flatMap((home, i) =>
    membersWithId.slice(i + 1).map(away => ({ home, away, homeScore: 0, awayScore: 0 })),
  );
  shuffle(matches);
  const matchesWithId = matches.map((match, index) => ({ ...match, id: index + 1 }));
  await SortResult.matches.bulkAdd(matchesWithId);
  await SortResult.members.bulkAdd(membersWithId);
};

export const getMatchById = async id => {
  return await SortResult.matches.get(id);
};

export const getMemberById = async id => {
  return await SortResult.members.get(id);
};

export const updateMemberScore = async (matchId, member1, member2, increaseNumber1, increaseNumber2) => {
  await SortResult.members.update(member1.id, {
    score: member1.score + increaseNumber1,
  });
  await SortResult.members.update(member2.id, {
    score: member2.score + increaseNumber2,
  });
  await SortResult.matches.update(matchId, { homeScore: increaseNumber1, awayScore: increaseNumber2 });
};

export const undoLastPick = async id => {
  const lastPicked = await getMatchById(id);
  const home = await SortResult.members.get(lastPicked.home.id);
  const away = await SortResult.members.get(lastPicked.away.id);
  await SortResult.members.update(home.id, {
    score: home.score - lastPicked.homeScore,
  });
  await SortResult.members.update(away.id, {
    score: away.score - lastPicked.awayScore,
  });
  await SortResult.matches.update(id, { homeScore: 0, awayScore: 0 });

  return { newHome: lastPicked.home, newAway: lastPicked.away };
};
