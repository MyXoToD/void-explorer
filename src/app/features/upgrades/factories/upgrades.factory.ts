import { Upgrade } from '../models/upgrade.interface';
import { UpgradeType } from '../models/upgradeType.enum';

const ROCKET_UPGRADES: Upgrade[] = [
  {
    id: 'mass_reduction',
    name: 'Mass Reduction',
    description: "Increases your ship's speed.",
    baseCost: 100,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Rocket,
  },
  {
    id: 'fuel_efficiency',
    name: 'Fuel Efficiency',
    description: 'Increases the distance you can travel on a single fuel load.',
    baseCost: 120,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Rocket,
  },
  {
    id: 'fuel_weight',
    name: 'Fuel Weight',
    description: 'Decreases the weight of your fuel.',
    baseCost: 130,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Rocket,
  },
  {
    id: 'fuel_capacity',
    name: 'Fuel Capacity',
    description: 'Increases the amount of fuel you can carry.',
    baseCost: 140,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Rocket,
  },
];
const ATTACK_UPGRADES: Upgrade[] = [
  {
    id: 'attack_damage',
    name: 'Attack Damage',
    description: 'Increases the damage of your attacks.',
    baseCost: 150,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Attack,
  },
];
const DEFENSE_UPGRADES: Upgrade[] = [
  {
    id: 'hull_strength',
    name: 'Hull Strength',
    description: 'Increases the strength of your ship hull.',
    baseCost: 200,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Defense,
  },
];
const ECONOMY_UPGRADES: Upgrade[] = [
  {
    id: 'credit_multiplier',
    name: 'Credit Multiplier',
    description: 'Increases the amount of credits earned from runs.',
    baseCost: 250,
    costMultiplier: 1.5,
    level: 0,
    type: UpgradeType.Economy,
  },
];

export const upgradesFactory = (): Upgrade[] => {
  return [...ROCKET_UPGRADES, ...ATTACK_UPGRADES, ...DEFENSE_UPGRADES, ...ECONOMY_UPGRADES];
};
