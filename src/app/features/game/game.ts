import { NgClass } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GameState } from '../../shared/game-state';

@Component({
  selector: 've-game',
  imports: [NgClass],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {
  private _state = inject(GameState);

  currentHeight = signal<number>(0);
  skyColor = signal<string>('hsl(197, 71%, 73%)');
  starsOpacity = signal<number>(0);
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random(),
    y: Math.random(),
    d: Math.random(),
  }));
  spaceAt = 2000; //100_000; // Height at which space starts
  launched = false;

  constructor() {
    effect(() => {
      this.launched = this._state.currentRun().started;
    });
  }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const countdownElements = document.querySelectorAll('.countdown span');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < countdownElements.length) {
        countdownElements[currentIndex].classList.add('active');
        currentIndex++;
      } else {
        console.log('Countdown finished');
        clearInterval(interval);
        this.launchRocket();
      }
    }, 1000);
  }

  launchRocket() {
    this._state.updateCurrentRun({ started: true });

    console.log('Rocket launched!');

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  loop(timestamp: number) {
    this.currentHeight.update((height) => height + 1);

    // console.log(this.currentHeight());
    this.getSkyColor();
    this.getStarsOpacity();

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
