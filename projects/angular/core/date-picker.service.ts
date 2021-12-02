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
    minEndDate: Date,
    e: MatDatepickerInputEvent<Date>
  ): void {
    if (!e) return;
    const value: Date = e.value;
    minEndDate = this.getMinEndDate(value);
    const initialEndDate = new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      value.getDate() - 1
    );

    const endDateCtrl = formGroup.get('endDate');
    const endDate: Date = endDateCtrl.value;
    if (!endDate) endDateCtrl.setValue(initialEndDate);

    if (endDate.getTime() < initialEndDate.getTime())
      endDateCtrl.setValue(initialEndDate);
  }

  public dateFilterFn(minDate: Date, date: Date): boolean {
    if (!date) return;

    if (date === null || date === undefined || minDate === undefined)
      return false;

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getTime() === minDate.getTime();
  }

  public getMinDate(venue: Venue): Date {
    let openingDate = new Date(venue.openingDate);

    openingDate.setHours(0);
    openingDate.setMinutes(0);
    openingDate.setSeconds(0);
    openingDate.setMilliseconds(0);

    return openingDate;
  }

  public getMinEndDate(minDate: Date): Date {
    const endDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate() + 1
    );

    return endDate;
  }

  public setDates(
    formGroup: FormGroup,
    venue: Venue
  ): {
    minDate: Date;
    minEndDate: Date;
    startDateControl: AbstractControl;
    endDateControl: AbstractControl;
  } {
    const minDate = this.getMinDate(venue);
    const minEndDate = this.getMinEndDate(minDate);
    const initialEndDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth() + 1,
      minDate.getDate() - 1
    );

    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
    const startDate = startDateControl.value;
    const endDate = endDateControl.value;

    if (!startDate || minDate > startDate) startDateControl.setValue(minDate);
    if (!endDate || initialEndDate > endDate)
      endDateControl.setValue(initialEndDate);

    return { minDate, minEndDate, startDateControl, endDateControl };
  }
}
