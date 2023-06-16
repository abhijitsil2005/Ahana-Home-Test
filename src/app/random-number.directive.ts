import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { randomNumber } from './numberModel';

@Directive({
  exportAs: 'appRandomNumber',
  selector: '[appRandomNumber]',
})
export class RandomNumberDirective implements OnInit {
  #randomNumbers: randomNumber;

  @Output()
  numberGenerated = new EventEmitter<randomNumber>();

  ngOnInit(): void {
    this.generateNumbers();
  }

  generateNumbers(): void {
    this.#randomNumbers = new randomNumber();
    var firstNum = Math.floor(Math.random() * (50 - 40)) + 40;
    this.#randomNumbers.firstNumber = firstNum;

    var secNum = Math.floor(Math.random() * (50 - 40)) + 1;
    this.#randomNumbers.secondNumber = secNum;

    this.numberGenerated.emit(this.#randomNumbers);
  }
}
