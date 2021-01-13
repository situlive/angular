import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

import { PasswordService } from './password.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private passwordService: PasswordService) {}

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !this.passwordService.isValid(control.value)
        ? { invalidPassword: control.value }
        : null;
    };
  }

  compareValidator(fg: FormGroup, target: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const comparer = fg.get(target).value;
      return control.value !== comparer
        ? { invalidCompare: control.value }
        : null;
    };
  }

  getEmailError(control: AbstractControl) {
    return control.hasError('required')
      ? 'This field is required.'
      : control.hasError('email')
      ? 'Not a valid email address.'
      : '';
  }

  getPasswordError(control: AbstractControl) {
    if (control.hasError('invalidCompare')) {
      return "Your passwords don't match.";
    } else if (control.hasError('required')) {
      return 'You must specify a password.';
    }

    return 'Your password is invalid.';
  }
}
