import { Injectable, signal } from '@angular/core';
import { GameSettings } from '../features/settings/models/game-settings.interface';
import { Languages } from '../features/settings/models/languages.enum';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _credits = signal<number>(1000);
  readonly credits = this._credits.asReadonly();
  private _settings = signal<GameSettings>({
    language: Languages.en,
    music: true,
    soundEffects: true,
    musicVolume: 1,
    soundEffectsVolume: 1,
    vibration: true,
  });
  settings = this._settings.asReadonly();
  private _currentRun = signal<any>({
    active: false,
    launched: false,
  });
  currentRun = this._currentRun.asReadonly();

  earnCredits(amount: number) {
    this._credits.update((current) => current + amount);
  }

  spendCredits(amount: number) {
    this._credits.update((current) => current - amount);
  }

  updateSettings(newSettings: Partial<GameSettings>) {
    this._settings.update((current) => ({ ...current, ...newSettings }));
  }

  updateCurrentRun(newRun: Partial<any>) {
    this._currentRun.update((current) => ({ ...current, ...newRun }));
  }
}
