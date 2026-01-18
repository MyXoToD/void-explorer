import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 've-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly _router = inject(Router);

  startRun() {
    this._router.navigate(['/game']);
  }
}
