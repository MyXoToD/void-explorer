import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GameState } from '../../shared/game-state';
import { formatCurrency } from '../../shared/helper/formatCurrency';
import { Upgrade } from './models/upgrade.interface';
import { UpgradeType } from './models/upgradeType.enum';

@Component({
  selector: 've-upgrades',
  imports: [NgClass, TranslatePipe],
  templateUrl: './upgrades.html',
  styleUrl: './upgrades.scss',
})
export class Upgrades {
  private readonly _state = inject(GameState);
  upgrades = this._state.upgrades;
  activeMenu: UpgradeType = UpgradeType.Rocket;
  visibleUpgrades = this.upgrades().filter((u) => u.type === this.activeMenu);

  buyUpgrade(upgrade: Upgrade) {
    this._state.updateUpgrade(upgrade.id, { level: upgrade.level + 1 });
    this._state.spendCredits(this.getPrice(upgrade));
    this.visibleUpgrades = this.upgrades().filter((u) => u.type === this.activeMenu);
  }

  canBuyUpgrade(upgrade: Upgrade): boolean {
    return this._state.credits() >= this.getPrice(upgrade);
  }

  getPrice(upgrade: Upgrade): number {
    return upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level);
  }

  setMenu(menu: string) {
    this.activeMenu = menu as UpgradeType;
    this.visibleUpgrades = this.upgrades().filter((u) => u.type === this.activeMenu);
  }

  formatPrice(price: number): string {
    return formatCurrency(price);
  }
}
