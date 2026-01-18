import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'game',
    loadComponent: () => import('./features/game/game').then((c) => c.Game),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((c) => c.Settings),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
