import Dexie from 'dexie';

export const SortResult = new Dexie('SortResult');

SortResult.version(2).stores({
  history: '++id, battleId, homeIndex, awayIndex',
  battles: 'id, home, away, parentId, tempId, result, status',
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

export const addToHistory = async battle => {
  await SortResult.history.add(battle);
};

export const bulkAddFilteredMembers = async members => {
  const shuffledMembers = shuffle(members.map(member => member));
  const membersWithId = shuffledMembers.map((member, index) => ({ ...member, id: index + 1 }));
  const midMember = Math.ceil(membersWithId.length / 2);
  let battles = [
    {
      tempId: 0,
      parentId: 0,
      status: 'home',
      home: membersWithId.slice(0, midMember),
      away: membersWithId.slice(midMember, membersWithId.length),
      result: membersWithId,
    },
  ];
  for (let i = 1; i < battles.length + 1; i++) {
    const parent = battles[i - 1];
    if (parent.home.length > 1) {
      const midpoint = Math.ceil(parent.home.length / 2);
      battles.push({
        tempId: parent.tempId + i,
        status: 'home',
        home: parent.home.slice(0, midpoint),
        away: parent.home.slice(midpoint, parent.home.length),
        result: parent.home,
        parentId: parent.tempId,
      });
    }
    if (parent.away.length > 1) {
      const midpoint = Math.ceil(parent.away.length / 2);
      battles.push({
        tempId: parent.tempId + i + 1,
        status: 'away',
        home: parent.away.slice(0, midpoint),
        away: parent.away.slice(midpoint, parent.away.length),
        result: parent.away,
        parentId: parent.tempId,
      });
    }
  }
  const battlesWithId = battles.reverse().map((battle, index) => ({ ...battle, id: index + 1 }));
  await SortResult.battles.bulkAdd(battlesWithId);
};

export const getBattleById = async id => {
  return await SortResult.battles.get(id);
};

export const getParentBattle = async id => {
  return await SortResult.battles.get({ tempId: id });
};

export const undoLastPick = async () => {
  const history = await SortResult.history.toArray();
  const lastPicked = history[history.length - 1];
  await SortResult.history.where('id').equals(lastPicked.id).delete();
  const battle = await getBattleById(lastPicked.battleId);
  const lastPickedHome = lastPicked.homeIndex;
  const lastPickedAway = lastPicked.awayIndex;

  return { lastBattleId: battle.id, lastPickedHome, lastPickedAway };
};

export const updateBattleSorter = async (battle, homeBattleId, awayBattleId, team) => {
  const homeIndex = battle.result.findIndex(el => el.id === homeBattleId);
  const awayIndex = battle.result.findIndex(el => el.id === awayBattleId);
  if (team === 'home' && homeIndex < awayIndex) return;
  if (team === 'away' && awayIndex < homeIndex) return;
  if (team === 'home' && homeIndex > awayIndex) {
    await SortResult.battles.update(battle.id, { result: array_move(battle.result, homeIndex, awayIndex) });
    return;
  }
  if (team === 'tie' &&  homeIndex < awayIndex) {
    await SortResult.battles.update(battle.id, { result: array_move(battle.result, awayIndex, homeIndex + 1) });
    return;
  }
  if (team === 'tie' &&  homeIndex > awayIndex) {
    await SortResult.battles.update(battle.id, { result: array_move(battle.result, homeIndex, awayIndex + 1) });
    return;
  }
  await SortResult.battles.update(battle.id, { result: array_move(battle.result, awayIndex, homeIndex) });
};

export const updateParentBattle = async battle => {
  const parent = await getParentBattle(battle.parentId);
  if (battle.status === 'home') {
    await SortResult.battles.update(parent.id, { home: battle.result, result: [...battle.result, ...parent.away] });
  } else {
    await SortResult.battles.update(parent.id, { away: battle.result, result: [...parent.home, ...battle.result] });
  }
};
