import { UpgradeType } from './upgradeType.enum';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  level: number;
  type: UpgradeType;
}
