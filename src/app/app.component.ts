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
export class AppComponent implements OnInit {
  title = 'calender';

  // moment today
  public date = moment();
  public daysArr;
  public dateForm: FormGroup;
  public isReserved;

  constructor(private fb: FormBuilder) {
    this.initDateRange();
  }

  public initDateRange() {
    return (this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    }));
  }

  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }

  public createCalendar(month) {

    const firstDay = moment(month).startOf('month');
    console.log('month days: ' + month.daysInMonth());

    // creates an array of length month.daysInMonth()
    const days = Array.apply(null, { length: month.daysInMonth() })
      // tslint:disable-next-line:max-line-length
      /* The first argument is a callback function to apply to each element in the array, the second argument is the this value inside the callback.*/
      .map(Number.call, Number)
      // add days
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });


    // add null´s to correct month start
    // n=1 to start the week at monday
    for (let n = 1; n < firstDay.weekday(); n++) {
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


  // add or sub 1 month than creat calender to show
  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }
  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public reserve() {
    if (!this.dateForm.valid) {
      return;
    }
    const dateFromMoment = this.dateForm.value.dateFrom;
    const dateToMoment = this.dateForm.value.dateTo;
    this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;

    console.log(this.isReserved);
  }

  public isSelected(day) {
    if (!day) {
      return false;
    }
    const dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
    const dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');

    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.isSame(day);
    }
  }


  public selectedDate(day) {
    const dayFormatted = day.format('DD/MM/YYYY');
    if (this.dateForm.valid) {
      this.dateForm.setValue({ dateFrom: null, dateTo: null });
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
  }


}
