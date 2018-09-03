import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'calender';

  //today
  public date = moment();

  public daysArr;

  constructor() {
  }


  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }

  public createCalendar(month) {

    let firstDay = moment(month).startOf('M');
    console.log("month days: " + month.daysInMonth())

    // creates an array of length month.daysInMonth()
    let days = Array.apply(null, { length: month.daysInMonth() })
      //The first argument is a callback function to apply to each element in the array, the second argument is the this value inside the callback.
      .map(Number.call, Number)
      //add days
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });


    // add null´s to correct month start
    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }

    return days;
  }

  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }


      //add or sub 1 month than creat calender
  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }
  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }



}
