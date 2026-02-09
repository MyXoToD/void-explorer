import { Component, inject } from '@angular/core';
import { GameState } from '../../shared/game-state';
import { Navigation } from '../navigation/navigation';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 've-sidebar',
  imports: [Navigation, Topbar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly state = inject(GameState);

  earnCredits() {
    this.state.earnCredits(1000);
  }

  spendCredits() {
    this.state.spendCredits(1000);
  }
}
