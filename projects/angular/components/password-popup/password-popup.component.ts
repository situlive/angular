import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { PasswordService } from '@situlive/angular';

@Component({
  selector: 'situ-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'situ-password-popup',
  },
})
export class PasswordPopupComponent implements OnInit {
  @Input() set input(value: string) {
    this.number = this.passwordService.hasNumber(value);
    this.lowercase = this.passwordService.hasLowerCase(value);
    this.uppercase = this.passwordService.hasUpperCase(value);
  }

  @Input() set open(value: boolean) {
    this.isOpen = value;
  }

  isOpen: boolean = false;
  number: boolean = false;
  lowercase: boolean = false;
  uppercase: boolean = false;

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {}
}
