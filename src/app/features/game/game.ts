import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 've-game',
  imports: [NgClass],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  launched = false;

  launchRocket() {
    this.launched = true;
    console.log('Rocket launched!');
  }
}
