import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NavigationLink } from './models/navigation-link.interface';

@Component({
  selector: 've-navigation',
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  links: NavigationLink[] = [
    {
      label: 'Launch',
      href: 'launch',
      icon: 'rocket',
      mobileOrder: 3,
    },
    {
      label: 'Upgrades',
      href: 'upgrades',
      icon: 'circle-arrow-up',
      mobileOrder: 2,
    },
    {
      label: 'Research',
      href: 'research',
      icon: 'flask',
      mobileOrder: 1,
    },
    {
      label: 'Achievements',
      href: 'achievements',
      icon: 'trophy',
      mobileOrder: 4,
    },
    {
      label: 'Settings',
      href: 'settings',
      icon: 'gear',
      mobileOrder: 5,
    },
  ];
}
