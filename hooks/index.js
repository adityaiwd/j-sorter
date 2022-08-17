import create from 'zustand'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useJMSStore = create((set) => ({
   memberStatus: Number(cookies.get('memberStatus')) || 0,
   generations: cookies.get('generations') || '',
   createFilters: (memberStatus, generations) => {
      cookies.set('memberStatus', memberStatus.toString(), { path: '/' });
      cookies.set('generations', generations, { path: '/' });
      set({ memberStatus, generations })
   },
   resetFilters: () => set({ memberStatus: 0, generations: [] }),
}))

export default useJMSStore
