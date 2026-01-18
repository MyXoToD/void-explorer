import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationLink } from './models/navigation-link.interface';

@Component({
  selector: 've-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  links: NavigationLink[] = [
    {
      label: 'Dashboard',
      href: 'dashboard',
    },
    {
      label: 'Upgrades',
      href: 'upgrades',
    },
    {
      label: 'Research',
      href: 'research',
    },
    {
      label: 'Achievements',
      href: 'achievements',
    },
    {
      label: 'Settings',
      href: 'settings',
    },
  ];
}
