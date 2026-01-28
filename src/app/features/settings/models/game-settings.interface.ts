import { Languages } from './languages.enum';

export interface GameSettings {
  language: Languages;
  music: boolean;
  soundEffects: boolean;
  musicVolume: number;
  soundEffectsVolume: number;
  vibration: boolean;
}
