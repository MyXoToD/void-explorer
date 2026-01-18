import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _credits = signal<number>(1000);
  readonly credits = this._credits.asReadonly();
}
