import { Directive, HostListener, inject } from '@angular/core';
import { GameState } from '../game-state';
import { hapticsImpactMedium } from './haptics';

@Directive({
  selector: '[vibrate]',
})
export class Vibrate {
  private readonly _state = inject(GameState);

  @HostListener('click')
  onClick() {
    if (this._state.settings().vibration) {
      // navigator.vibrate(50);
      hapticsImpactMedium();
    }
  }
}
