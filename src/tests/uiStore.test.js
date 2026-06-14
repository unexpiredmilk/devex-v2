import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../store/uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    useUIStore.getState().resetProgress();
  });

  it('addReward: should correctly increase exp and level up at 100 XP', () => {
    const store = useUIStore.getState();
    // Начальные значения (exp: 0, level: 1, tokens: 0)
    store.addReward(50, 10);
    
    let op = useUIStore.getState().operator;
    expect(op.exp).toBe(50);
    expect(op.level).toBe(1);
    expect(op.tokens).toBe(10);

    // Добавляем 60 опыта (50 + 60 = 110). Должно стать 10 опыта и 2-й уровень.
    store.addReward(60, 5); 
    op = useUIStore.getState().operator;
    expect(op.exp).toBe(10);
    expect(op.level).toBe(2);
    expect(op.tokens).toBe(15);
  });

  it('purchaseImplant: should deduct tokens and add to unlockedImplants, or return false if not enough tokens', () => {
    const store = useUIStore.getState();
    
    // Пытаемся купить без токенов (tokens: 0, cost: 10)
    let result = store.purchaseImplant('test-implant', 10);
    expect(result).toBe(false);
    expect(useUIStore.getState().operator.unlockedImplants).not.toContain('test-implant');

    // Даем 15 токенов и покупаем имплант за 10
    store.injectResources(0, 15);
    result = useUIStore.getState().purchaseImplant('test-implant', 10);
    
    expect(result).toBe(true);
    
    const op = useUIStore.getState().operator;
    expect(op.tokens).toBe(5); // 15 - 10 = 5
    expect(op.unlockedImplants).toContain('test-implant');
  });
});
