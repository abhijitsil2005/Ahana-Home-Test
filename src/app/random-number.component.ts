import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { randomNumber, result } from './numberModel';
import { timer } from 'rxjs';

@Component({
  selector: 'app-random-number',
  templateUrl: 'random-number.component.html',
  styleUrls: ['random-number.component.css'],
})
export class RandomNumberComponent {
  randomNumbers: randomNumber;
  tablesList: randomNumber[] = [];
  randomTablesList: randomNumber[];
  wrongAnswerList: result[] = [];
  firstNumber: number;
  secondNumber: number;
  inputAnswer: string = '';
  answerCheck: string;
  calAnswer: string;
  isCorrectAnswer: boolean = false;
  currentIndex: number = 0;
  isTestComplete: boolean = false;
  score: string = '';
  timer: number = 45;
  timeLeft: number;
  interval: any;
  subscribeTimer: any;
  isDisabled: boolean = false;
  startNum = 31;
  lastNum = 50;

  ngOnInit(): void {
    for (this.startNum; this.startNum < this.lastNum; this.startNum++) {
      for (let sn = 1; sn <= 5; sn++) {
        let mul = new randomNumber();
        mul['firstNumber'] = this.startNum;
        mul['secondNumber'] = sn;
        this.tablesList.push(mul);
      }
    }

    this.randomTablesList = this.shuffleTableList(this.tablesList);

    this.firstNumber = this.randomTablesList[this.currentIndex].firstNumber;
    this.secondNumber = this.randomTablesList[this.currentIndex].secondNumber;
    this.currentIndex++;
    this.inputAnswer = '';
    this.calAnswer = '';
    this.answerCheck = '';
    this.isCorrectAnswer = false;
    this.timeLeft = this.timer;
    this.startTimer();
  }

  shuffleTableList(tabList: randomNumber[]): randomNumber[] {
    //let ranTblLst: randomNumber[] = [];
    for (let i = tabList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tabList[i], tabList[j]] = [tabList[j], tabList[i]];
    }
    return tabList;
  }

  getNextQuestion() {
    console.log('next number is called');
    if (this.currentIndex < this.randomTablesList.length) {
      this.firstNumber = this.randomTablesList[this.currentIndex].firstNumber;
      this.secondNumber = this.randomTablesList[this.currentIndex].secondNumber;
      this.currentIndex++;
      console.log(this.currentIndex);
      this.startTimer();
    } else {
      console.log('inside else condition');
      this.isTestComplete = true;
      this.score = ` ${
        this.randomTablesList.length - this.wrongAnswerList.length
      } / ${this.randomTablesList.length} `;
      console.log(this.score);
      this.pauseTimer();
    }
    this.inputAnswer = '';
    this.calAnswer = '';
    this.answerCheck = '';
    this.isCorrectAnswer = false;
    this.timeLeft = this.timer;
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
      let wrongAns = new result();
      wrongAns.firstNumber = this.firstNumber;
      wrongAns.secondNumber = this.secondNumber;
      wrongAns.inputAnswer = +this.inputAnswer;
      wrongAns.correctAnswer = calAns;
      wrongAns.timeTaken = this.timer - this.timeLeft;
      this.wrongAnswerList.push(wrongAns);
    }
    this.pauseTimer();
    return this.answerCheck;
  }

  // oberserableTimer() {
  //   const source = timer(1000);
  //   const abc = source.subscribe((val) => {
  //     console.log(val, '-');
  //     if (val < this.timeLeft) {
  //       this.subscribeTimer = this.timeLeft - val;
  //     } else {
  //       this.checkAnswer();
  //       return;
  //     }
  //   });
  // }

  startTimer() {
    this.isDisabled = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.checkAnswer();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.isDisabled = true;
  }
}
