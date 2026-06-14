import { create } from 'zustand';

const useStore = create((set) => ({
  user: {
    callsign: 'KIRS_OPERATOR',
    level: 1,
    xp: 0,
    tokens: 5,
    energy: 5,
  },

  addXp: (amount) => set((state) => {
    let newXp = state.user.xp + amount;
    let newLevel = state.user.level;
    let newTokens = state.user.tokens;

    if (newXp >= 50) {
      newXp -= 50;
      newLevel += 1;
      newTokens += 1;
    }

    return { 
      user: { ...state.user, xp: newXp, level: newLevel, tokens: newTokens } 
    };
  }),

  useEnergy: (amount) => set((state) => ({
    user: { ...state.user, energy: Math.max(0, state.user.energy - amount) }
  })),

  setUser: (userData) => set({ user: userData }),
}));

// Эта строка обязательна для работы import useStore from '../store/useStore';
export default useStore;