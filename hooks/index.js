import create from 'zustand'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useJMSStore = create((set) => ({
   memberStatus: Number(cookies.get('memberStatus')) || 0,
   generations: cookies.get('generations') || '',
   currentMatchId: Number(cookies.get('matchId')) || 0,
   homeCounter: Number(cookies.get('homeCounter')) || 0,
   awayCounter: Number(cookies.get('awayCounter')) || 0,
   createFilters: (memberStatus, generations) => {
      cookies.set('memberStatus', memberStatus.toString(), { path: '/' });
      cookies.set('generations', generations, { path: '/' });
      set({ memberStatus, generations })
   },
   setCurrentMatchId: (currentMatchId) => {
      cookies.set('matchId', currentMatchId, { path: '/' });
      set({ currentMatchId })
   },
   setHomeCounter: (homeCounter) => {
      cookies.set('homeCounter', homeCounter, { path: '/' });
      set({ homeCounter })
   },
   setAwayCounter: (awayCounter) => {
      cookies.set('awayCounter', awayCounter, { path: '/' });
      set({ awayCounter })
   },
}))

export default useJMSStore
