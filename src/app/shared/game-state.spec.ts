import { TestBed } from '@angular/core/testing';

import { GameState } from './game-state';

describe('GameState', () => {
  let state: GameState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(GameState);
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });

  it('should have default money', () => {
    expect(state.credits()).toEqual(1000);
  });

  it('should earn money', () => {
    state.earnCredits(1000);
    expect(state.credits()).toEqual(2000);
  });
});
