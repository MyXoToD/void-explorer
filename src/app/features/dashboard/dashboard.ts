import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Vibrate } from '../../shared/directives/vibrate';

@Component({
  selector: 've-dashboard',
  imports: [Vibrate],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly _router = inject(Router);

  startRun() {
    this._router.navigate(['/game']);
  }
}
