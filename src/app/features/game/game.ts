import { NgClass } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { hapticsImpactLight, hapticsImpactMedium } from '../../shared/directives/haptics';
import { GameState } from '../../shared/game-state';

@Component({
  selector: 've-game',
  imports: [NgClass],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit, OnDestroy {
  private _state = inject(GameState);

  // --- UI State ---
  currentHeight = signal<number>(0);
  skyColor = signal<string>('hsl(197, 71%, 73%)');
  starsOpacity = signal<number>(0);
  launched = signal<boolean>(false);
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random(),
    y: Math.random(),
    d: Math.random(),
  }));
  spaceAt = 100_000; // Height at which space starts (m)
  fuelPercent = 1; // Percentage of fuel remaining

  // --- Physics Simulation Timing ---
  private lastFrameTime: number = 0;
  private elapsedTime: number = 0;

  // --- Physical Constants ---
  private readonly STANDARD_GRAVITY = 9.80665; // m/s² - standard gravity
  private readonly EARTH_RADIUS = 6_371_000; // m
  private readonly SEA_LEVEL_AIR_DENSITY = 1.225; // kg/m³
  private readonly ATMOSPHERIC_SCALE_HEIGHT = 8500; // m

  // --- Vehicle Parameters ---
  private readonly EXHAUST_VELOCITY = 2766; // m/s (Falcon 9-like, ~282s Isp)
  private readonly ROCKET_DRY_MASS = 25_000; // kg
  private readonly INITIAL_PROPELLANT_MASS = 400_000; // kg
  private readonly MAX_MASS_FLOW_RATE = 2500; // kg/s at full throttle
  private readonly DRAG_COEFFICIENT = 0.3; // simplified
  private readonly REFERENCE_CROSS_SECTION = 11.0; // m² (~3.7m diameter)

  // --- Rocket State ---
  private rocketAltitude: number = 0; // m
  private verticalVelocity: number = 0; // m/s
  private totalRocketMass: number = 0; // kg
  private remainingPropellantMass: number = 0; // kg
  private throttleLevel: number = 1.0; // 0..1 (100% throttle by default)
  private isEngineActive: boolean = true;

  constructor() {
    this.launched.set(false);
    this._state.updateCurrentRun({ active: true });
    // Initialize rocket properties
    this.remainingPropellantMass = this.INITIAL_PROPELLANT_MASS;
    this.totalRocketMass = this.ROCKET_DRY_MASS + this.remainingPropellantMass;
    effect(() => {
      this.launched.set(this._state.currentRun().launched);
    });
  }

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this._state.updateCurrentRun({ active: false, launched: false });
  }

  startCountdown() {
    const countdownElements = document.querySelectorAll('.countdown span');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < countdownElements.length) {
        countdownElements[currentIndex].classList.add('active');
        hapticsImpactLight();
        currentIndex++;
      } else {
        hapticsImpactMedium();
        clearInterval(interval);
        this.launchRocket();
      }
    }, 1000);
  }

  launchRocket() {
    this._state.updateCurrentRun({ launched: true });
    this.lastFrameTime = performance.now();
    console.log('Rocket launched!');
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  /**
   * Calculate gravitational acceleration at a given altitude
   * Takes into account Earth's radius to model gravity falloff
   */
  private calculateGravityAt(altitude: number): number {
    const radiusFactor = this.EARTH_RADIUS / (this.EARTH_RADIUS + altitude);
    return this.STANDARD_GRAVITY * Math.pow(radiusFactor, 2);
  }

  /**
   * Calculate atmospheric air density at a given altitude
   * Uses exponential model with scale height
   */
  private calculateAirDensityAt(altitude: number): number {
    return this.SEA_LEVEL_AIR_DENSITY * Math.exp(-altitude / this.ATMOSPHERIC_SCALE_HEIGHT);
  }

  /**
   * Main physics simulation loop
   * Updates rocket position, velocity, and other state based on forces
   */
  loop(timestamp: number) {
    // Calculate delta time since last frame (clamp to prevent large jumps)
    const deltaTime = Math.min((timestamp - this.lastFrameTime) / 1000, 0.1);
    this.elapsedTime += deltaTime;
    this.lastFrameTime = timestamp;

    // --- Propellant Consumption ---
    this.fuelPercent = this.remainingPropellantMass / this.INITIAL_PROPELLANT_MASS;
    let massFlowRate = 0;
    if (this.isEngineActive && this.remainingPropellantMass > 0 && this.throttleLevel > 0) {
      massFlowRate = this.MAX_MASS_FLOW_RATE * this.throttleLevel;
      // Only burn what we have available
      const propellantBurned = Math.min(this.remainingPropellantMass, massFlowRate * deltaTime);
      this.remainingPropellantMass -= propellantBurned;
      this.totalRocketMass = this.ROCKET_DRY_MASS + this.remainingPropellantMass;
      // Scale mass flow rate to actual fuel consumed this frame
      massFlowRate = propellantBurned / deltaTime;
    } else {
      massFlowRate = 0;
      this.totalRocketMass = this.ROCKET_DRY_MASS + this.remainingPropellantMass;
    }

    // --- Force Calculations ---
    const thrust = massFlowRate * this.EXHAUST_VELOCITY; // F = mdot * ve (Newtons)
    const gravitationalAcceleration = this.calculateGravityAt(this.rocketAltitude);
    const airDensity = this.calculateAirDensityAt(this.rocketAltitude);

    // Drag opposes direction of motion
    const velocityDirection = this.verticalVelocity === 0 ? 0 : Math.sign(this.verticalVelocity);
    const dragForce =
      0.5 *
      airDensity *
      this.verticalVelocity *
      this.verticalVelocity *
      this.DRAG_COEFFICIENT *
      this.REFERENCE_CROSS_SECTION *
      velocityDirection;

    // Net acceleration (upward positive): (thrust - drag) / mass - gravity
    const verticalAcceleration =
      (thrust - dragForce) / this.totalRocketMass - gravitationalAcceleration;

    // --- Integration (Euler method) ---
    this.verticalVelocity += verticalAcceleration * deltaTime;
    this.rocketAltitude = Math.max(0, this.rocketAltitude + this.verticalVelocity * deltaTime);

    // --- Engine Cutoff ---
    if (this.remainingPropellantMass <= 0) {
      this.isEngineActive = false;
    }

    // --- Update UI State ---
    this.currentHeight.set(this.rocketAltitude);
    this._state.updateCurrentRun({
      distance: this.rocketAltitude,
      speed: this.verticalVelocity,
    });

    this.getSkyColor();
    this.getStarsOpacity();

    // --- Logging ---
    console.clear();
    console.log(
      `Alt: ${this.rocketAltitude.toFixed(0)}m | Vel: ${this.verticalVelocity.toFixed(1)}m/s | ` +
        `Acc: ${verticalAcceleration.toFixed(2)}m/s² | Mass: ${Math.round(this.totalRocketMass)}kg | ` +
        `Thrust: ${(thrust / 1000).toFixed(1)}kN | Throttle: ${(this.throttleLevel * 100) | 0}% | ` +
        `Time: ${Math.round(this.elapsedTime)}s`,
    );

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  getSkyColor() {
    if (this.currentHeight() >= this.spaceAt) {
      this.skyColor.set('black');
      return;
    }
    const lightness = 73 - (73 / this.spaceAt) * this.currentHeight();

    this.skyColor.set(`hsl(197, 71%, ${lightness}%)`);
  }

  getStarsOpacity() {
    if (this.currentHeight() >= this.spaceAt) {
      this.starsOpacity.set(1);
      return;
    }
    const opacity = (1 / this.spaceAt) * this.currentHeight();
    this.starsOpacity.set(opacity);
  }
}
