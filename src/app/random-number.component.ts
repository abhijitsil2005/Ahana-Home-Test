import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { randomNumber } from './numberModel';

@Component({
  selector: 'app-random-number',
  templateUrl: 'random-number.component.html',
  styleUrls: ['random-number.component.css'],
})
export class RandomNumberComponent {
  randomNumbers: randomNumber;
  firstNumber: number;
  secondNumber: number;
  inputAnswer: string = '';
  answerCheck: string;
  calAnswer: string;

  onNumberGenerated(randomNumbers: randomNumber): void {
    console.log('called');
    this.inputAnswer = '';
    this.calAnswer = '';
    this.answerCheck = '';
    this.firstNumber = randomNumbers.firstNumber;
    this.secondNumber = randomNumbers.secondNumber;
    console.log(randomNumbers);
  }

  checkAnswer(): string {
    var calAns = this.firstNumber * this.secondNumber;
    this.calAnswer = calAns.toString(10);

    if (calAns === +this.inputAnswer) this.answerCheck = 'Correct';
    else this.answerCheck = 'Wrong';

    return this.answerCheck;
  }
}
