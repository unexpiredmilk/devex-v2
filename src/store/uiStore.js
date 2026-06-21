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
        tokens: 150, 
        energy: 3,
        unlockedImplants: ['emmet', 'locator', 'cassie'], 
        unlockedAchievements: [], // <-- ВШИЛИ ХРАНИЛИЩЕ АЧИВОК
        stats: { emmetUsed: 0 }
      },
      
      setTheme: (t) => set({ theme: t }),
      setChapter: (id) => set({ selectedChapter: id, currentLessonIdx: 0 }),
      setLesson: (idx) => set({ currentLessonIdx: idx }),

      login: (name) => set((state) => ({
        operator: { ...state.operator, name, isAuthenticated: true }
      })),

      // --- ДОБАВЛЕННЫЙ ДВИЖОК АЧИВОК ---
      unlockAchievement: (id) => {
        const op = get().operator;
        const alreadyUnlocked = op.unlockedAchievements?.includes(id);
        
        if (!alreadyUnlocked) {
          set({
            operator: {
              ...op,
              unlockedAchievements: [...(op.unlockedAchievements || []), id],
              tokens: op.tokens + 25 // Приятный бонус за достижение
            }
          });
          return true; // Возвращает true, чтобы Workspace понял: "О, новая ачивка, запускай тост!"
        }
        return false;
      },

      incrementEmmet: () => set((state) => ({
        operator: {
          ...state.operator,
          stats: { 
            ...(state.operator.stats || {}), 
            emmetUsed: (state.operator.stats?.emmetUsed || 0) + 1 
          }
        }
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
          unlockedAchievements: [],
          unlockedImplants: ['emmet', 'locator', 'cassie'] 
        }
      })),
    }),
    {
      name: 'devex-operator-storage',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        operator: {
          ...currentState.operator,
          ...(persistedState?.operator || {}),
          unlockedAchievements: persistedState?.operator?.unlockedAchievements || [],
          unlockedImplants: persistedState?.operator?.unlockedImplants?.length > 0
            ? persistedState.operator.unlockedImplants
            : ['emmet', 'locator', 'cassie']
        }
      })
    }
  )
);
