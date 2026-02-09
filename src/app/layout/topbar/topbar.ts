import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GameState } from '../../shared/game-state';
import { formatDistance } from '../../shared/helper/formatDistance';
import { formatSpeed } from '../../shared/helper/formatSpeed';

@Component({
  selector: 've-topbar',
  imports: [TranslatePipe],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  state = inject(GameState);

  formatDistance = formatDistance;
  formatSpeed = formatSpeed;
}
