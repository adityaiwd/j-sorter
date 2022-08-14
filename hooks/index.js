import create from 'zustand'

const useJMSStore = create((set) => ({
   memberStatus: 0,
   generations: [],
   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
   removeAllBears: () => set({ bears: 0 }),
}))

export default useJMSStore
