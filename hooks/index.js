import create from 'zustand'
import Cookies from 'universal-cookie';
import { selectedMembers } from '../src/db'

const cookies = new Cookies();

const useJMSStore = create((set) => ({
   memberStatus: Number(cookies.get('memberStatus')) || 0,
   generations: [],
   members: selectedMembers || [],
   createFilters: (memberStatus, generations) => {
      cookies.set('memberStatus', memberStatus.toString(), { path: '/' });
      cookies.set('generations', generations, { path: '/' });
      set({ memberStatus, generations })
   },
   resetFilters: () => set({ memberStatus: 0, generations: [] }),
}))

export default useJMSStore
