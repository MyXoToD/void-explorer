import { Component, inject } from '@angular/core';
import { GameState } from '../../shared/game-state';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 've-sidebar',
  imports: [Navigation],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly state = inject(GameState);
}
