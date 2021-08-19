import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { Venue } from '@situlive/angular/data';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  constructor() {}

  public onDateChange(
    formGroup: FormGroup,
    changeoverDates: Date[],
    minEndDate: Date,
    e: MatDatepickerInputEvent<Date>
  ): void {
    const value: Date = e.value;
    minEndDate = this.getMinEndDate(value, changeoverDates);

    const endDateCtrl = formGroup.get('endDate');
    const endDate: Date = endDateCtrl.value;
    if (endDate.getTime() < minEndDate.getTime())
      endDateCtrl.setValue(minEndDate);
  }

  public dateFilterFn(
    formGroup: FormGroup,
    venue: Venue,
    changeoverDates: Date[],
    minDate: Date,
    date: Date
  ): boolean {
    const ignoreChangeoverDates = formGroup.get('ignoreChangeoverDates').value;
    if (ignoreChangeoverDates) return true;

    if (!venue || date === null || date === undefined || minDate === undefined)
      return false;

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return (
      date.getTime() === minDate.getTime() ||
      this.validChangeoverDate(date, changeoverDates)
    );
  }

  public getMinDate(venue: Venue, changeoverDates: Date[]): Date {
    const now = new Date();

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    if (!venue) return now;

    let openingDate = new Date(venue.openingDate);

    openingDate.setHours(0);
    openingDate.setMinutes(0);
    openingDate.setSeconds(0);
    openingDate.setMilliseconds(0);

    if (openingDate > now) return openingDate;

    return !changeoverDates.length ? now : changeoverDates[0];
  }

  public getMinEndDate(minDate: Date, changeoverDates: Date[]): Date {
    const endDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth() + 1,
      minDate.getDate()
    );
    if (!changeoverDates?.length) return endDate;

    const dates = changeoverDates.filter(
      (changeover) => changeover.getTime() > endDate.getTime()
    );

    if (dates.length) return dates[0];

    return endDate;
  }

  public setDates(
    formGroup: FormGroup,
    venue: Venue,
    changeoverDates: Date[]
  ): {
    minDate: Date;
    minEndDate: Date;
    startDateControl: AbstractControl;
    endDateControl: AbstractControl;
  } {
    const minDate = this.getMinDate(venue, changeoverDates);
    const minEndDate = this.getMinEndDate(minDate, changeoverDates);

    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
    const startDate = startDateControl.value;
    const endDate = endDateControl.value;

    if (!startDate || minDate > startDate) startDateControl.setValue(minDate);
    if (!endDate || minEndDate > endDate) endDateControl.setValue(minEndDate);

    return { minDate, minEndDate, startDateControl, endDateControl };
  }

  private validChangeoverDate(date: Date, changeoverDates: Date[]): boolean {
    if (changeoverDates?.length === 0) return false;

    return (
      changeoverDates.find(
        (changeover) => changeover.getTime() === date.getTime()
      ) !== undefined
    );
  }
}
