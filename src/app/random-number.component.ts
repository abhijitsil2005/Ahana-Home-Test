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
  tablesList: randomNumber[] = [];
  randomTablesList: randomNumber[];
  firstNumber: number;
  secondNumber: number;
  inputAnswer: string = '';
  answerCheck: string;
  calAnswer: string;
  isCorrectAnswer: boolean = false;
  currentIndex: number = 0;
  startNum = 40;
  lastNum = 50;

  ngOnInit(): void {
    for (this.startNum; this.startNum < this.lastNum; this.startNum++) {
      for (let sn = 1; sn <= 10; sn++) {
        let mul = new randomNumber();
        mul['firstNumber'] = this.startNum;
        mul['secondNumber'] = sn;
        this.tablesList.push(mul);
      }
    }

    console.log('before shuffling');
    console.log(this.tablesList);
    this.randomTablesList = this.shuffleTableList(this.tablesList);
    console.log('after shuffling');
    console.log(this.randomTablesList);

    console.log('on init is called');
    this.firstNumber = this.randomTablesList[this.currentIndex].firstNumber;
    this.secondNumber = this.randomTablesList[this.currentIndex].secondNumber;
    this.currentIndex++;
    this.inputAnswer = '';
    this.calAnswer = '';
    this.answerCheck = '';
    this.isCorrectAnswer = false;
  }

  shuffleTableList(tabList: randomNumber[]): randomNumber[] {
    //let ranTblLst: randomNumber[] = [];
    for (let i = tabList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tabList[i], tabList[j]] = [tabList[j], tabList[i]];
    }
    return tabList;
  }

  // onNumberGenerated(randomNumbers: randomNumber): void {
  //   console.log('called');
  //   this.inputAnswer = '';
  //   this.calAnswer = '';
  //   this.answerCheck = '';
  //   this.firstNumber = randomNumbers.firstNumber;
  //   this.secondNumber = randomNumbers.secondNumber;
  //   console.log(randomNumbers);
  // }

  getNextQuestion() {
    console.log('next number is called');
    if (this.currentIndex < this.randomTablesList.length) {
      this.firstNumber = this.randomTablesList[this.currentIndex].firstNumber;
      this.secondNumber = this.randomTablesList[this.currentIndex].secondNumber;
      this.currentIndex++;
    } else {
      this.answerCheck = 'all done!';
    }
    this.inputAnswer = '';
    this.calAnswer = '';
    this.answerCheck = '';
    this.isCorrectAnswer = false;
  }

  checkAnswer(): string {
    var calAns = this.firstNumber * this.secondNumber;
    this.calAnswer = calAns.toString(10);

    if (calAns === +this.inputAnswer) {
      this.answerCheck = 'Correct';
      this.isCorrectAnswer = true;
    } else {
      this.answerCheck = 'Wrong';
      this.isCorrectAnswer = false;
    }

    return this.answerCheck;
  }
}
