import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor() {}

  isValid(input: string): boolean {
    return (
      input &&
      this.hasNumber(input) &&
      this.hasLowerCase(input) &&
      this.hasUpperCase(input) &&
      input.length >= 6
    );
  }

  hasNumber(input: string): boolean {
    return input && /[0-9]/.test(input);
  }

  hasLowerCase(input: string): boolean {
    return input && /[a-z]/.test(input);
  }

  hasUpperCase(input: string): boolean {
    return input && /[A-Z]/.test(input);
  }
}
