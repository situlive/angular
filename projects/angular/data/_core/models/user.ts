import { BrandUser } from '.';
import { Category } from './category';
import { Plan } from './plan';
import { Theatre } from './theatre';

export enum UserGender {
  WomanGirl,
  ManBoy,
  TransWomanTransGirl,
  TransManTransBoy,
  NonBinaryGenderQueerAGenderGenderFluid,
  DoNotKnow,
  PreferNotToSay,
  Other,
}

export class User {
  id: string;
  image: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: UserGender;
  confirmed?: boolean; // A brand user variable

  brandUsers?: BrandUser[];
  categories?: Category[];
  plans?: Plan[];
  theatres?: Theatre[];
}