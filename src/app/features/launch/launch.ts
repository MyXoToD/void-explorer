import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Vibrate } from '../../shared/directives/vibrate';

@Component({
  selector: 've-launch',
  imports: [Vibrate],
  templateUrl: './launch.html',
  styleUrl: './launch.scss',
})
export class Launch {
  private readonly _router = inject(Router);

  startRun() {
    this._router.navigate(['/game']);
  }
}
