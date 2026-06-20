import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light' | 'rain'
      selectedChapter: null,
      currentLessonIdx: 0,
      
      operator: {
        name: '',
        isAuthenticated: false,
        exp: 0,
        level: 1,
        tokens: 150, // Дадим 150 токенов на мелкие расходы
        energy: 3,
        // ВОТ ОН — СТАРТОВЫЙ ПАКЕТ ПРЕВОСХОДСТВА (Cassie, Locator, Emmet)
        unlockedImplants: ['emmet', 'locator', 'cassie'], 
      },
      
      setTheme: (t) => set({ theme: t }),
      setChapter: (id) => set({ selectedChapter: id, currentLessonIdx: 0 }),
      setLesson: (idx) => set({ currentLessonIdx: idx }),

      login: (name) => set((state) => ({
        operator: { ...state.operator, name, isAuthenticated: true }
      })),

      addReward: (expAmount, tokenAmount) => set((state) => {
        const op = state.operator;
        let newExp = op.exp + expAmount;
        let newLevel = op.level;
        
        if (newExp >= 100) {
          newLevel += Math.floor(newExp / 100);
          newExp = newExp % 100;
        }
        
        return {
          operator: {
            ...op,
            exp: newExp,
            level: newLevel,
            tokens: op.tokens + tokenAmount
          }
        };
      }),

      purchaseImplant: (implantId, cost) => {
        const op = get().operator;
        if (op.tokens >= cost && !op.unlockedImplants.includes(implantId)) {
          set((state) => ({
            operator: {
              ...state.operator,
              tokens: op.tokens - cost,
              unlockedImplants: [...op.unlockedImplants, implantId]
            }
          }));
          return true;
        }
        return false;
      },

      useEnergy: (amount) => {
        const op = get().operator;
        if (op.energy >= amount) {
          set((state) => ({
            operator: { ...state.operator, energy: op.energy - amount }
          }));
          return true;
        }
        return false;
      },
      
      addEnergy: (amount) => set((state) => ({ 
        operator: { ...state.operator, energy: Math.min(3, state.operator.energy + amount) } 
      })),
      
      restoreEnergy: () => set((state) => ({ 
        operator: { ...state.operator, energy: 3 } 
      })),

      injectResources: (expAmount, tokensAmount) => set((state) => {
        const op = state.operator;
        let newExp = op.exp + expAmount;
        let newLevel = op.level;
        
        if (newExp >= 100) {
          newLevel += Math.floor(newExp / 100);
          newExp = newExp % 100;
        }
        
        return {
          operator: {
            ...op,
            exp: newExp,
            level: newLevel,
            tokens: op.tokens + tokensAmount
          }
        };
      }),

      resetProgress: () => set((state) => ({
        operator: {
          ...state.operator,
          exp: 0,
          level: 1,
          tokens: 0,
          energy: 3,
          unlockedImplants: ['emmet', 'locator', 'cassie'] // При сбросе OP-пакет сохраняется
        }
      })),
    }),
    {
      name: 'devex-operator-storage',
      // УМНЫЙ MERGE: Принудительно вшивает импланты в старый кэш браузера
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        operator: {
          ...currentState.operator,
          ...(persistedState?.operator || {}),
          unlockedImplants: persistedState?.operator?.unlockedImplants?.length > 0
            ? persistedState.operator.unlockedImplants
            : ['emmet', 'locator', 'cassie']
        }
      })
    }
  )
);
