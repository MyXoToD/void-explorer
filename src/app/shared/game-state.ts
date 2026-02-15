import { Injectable, signal } from '@angular/core';
import { GameSettings } from '../features/settings/models/game-settings.interface';
import { Languages } from '../features/settings/models/languages.enum';
import { upgradesFactory } from '../features/upgrades/factories/upgrades.factory';
import { Upgrade } from '../features/upgrades/models/upgrade.interface';

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
    distance: 0,
    speed: 0,
  });
  currentRun = this._currentRun.asReadonly();
  private _upgrades = signal<Upgrade[]>(upgradesFactory());
  upgrades = this._upgrades.asReadonly();

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

  updateUpgrade(upgradeId: string, newUpgrade: Partial<Upgrade>) {
    this._upgrades.update((current) =>
      current.map((upgrade) =>
        upgrade.id === upgradeId ? { ...upgrade, ...newUpgrade } : upgrade,
      ),
    );
  }
}
