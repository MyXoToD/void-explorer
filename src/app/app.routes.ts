import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'launch',
    pathMatch: 'full',
  },
  {
    path: 'launch',
    loadComponent: () => import('./features/launch/launch').then((c) => c.Launch),
  },
  {
    path: 'game',
    loadComponent: () => import('./features/game/game').then((c) => c.Game),
  },
  {
    path: 'upgrades',
    loadComponent: () => import('./features/upgrades/upgrades').then((c) => c.Upgrades),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((c) => c.Settings),
  },
  {
    path: '**',
    redirectTo: 'launch',
  },
];
