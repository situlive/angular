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
  public id: string;
  public image: string;
  public jobTitle: string;
  public firstName: string;
  public lastName: string;
  public userName?: string;
  public email?: string;
  public phoneNumber?: string;
  public dateOfBirth?: string;
  public gender?: UserGender;
  public confirmed?: boolean; // A brand user variable

  public brandUsers?: BrandUser[];
  public categories?: Category[];
  public plans?: Plan[];
  public theatres?: Theatre[];
}
