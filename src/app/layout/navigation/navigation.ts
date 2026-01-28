import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationLink } from './models/navigation-link.interface';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 've-navigation',
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  links: NavigationLink[] = [
    {
      label: 'Dashboard',
      href: 'dashboard',
      icon: 'house',
    },
    {
      label: 'Upgrades',
      href: 'upgrades',
      icon: 'house',
    },
    {
      label: 'Research',
      href: 'research',
      icon: 'house',
    },
    {
      label: 'Achievements',
      href: 'achievements',
      icon: 'house',
    },
    {
      label: 'Settings',
      href: 'settings',
      icon: 'house',
    },
  ];
}
