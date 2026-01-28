import { Directive, HostListener, inject } from '@angular/core';
import { GameState } from '../game-state';

@Directive({
  selector: '[vibrate]',
})
export class Vibrate {
  private readonly _state = inject(GameState);

  @HostListener('click')
  onClick() {
    if (navigator.vibrate && this._state.settings().vibration) {
      navigator.vibrate(50);
    }
  }
}
