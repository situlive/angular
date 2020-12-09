import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Attempt } from '../models/attempt';
import { Plan } from '../models/plan';
import { Profile } from '../models/profile';
import { Theatre } from '../models/theatre';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  private endpoint: string = 'users';
  private profileSubject: BehaviorSubject<Profile> = new BehaviorSubject(null);
  private categoryInterestsSubject: BehaviorSubject<
    any[]
  > = new BehaviorSubject([]);
  private planInterestsSubject: BehaviorSubject<Plan[]> = new BehaviorSubject(
    []
  );
  private theatreInterestsSubject: BehaviorSubject<
    Theatre[]
  > = new BehaviorSubject([]);

  public profile: Observable<Profile> = this.profileSubject.asObservable();
  public categoryInterests: Observable<
    string[]
  > = this.categoryInterestsSubject.asObservable();
  public planInterests: Observable<
    Plan[]
  > = this.planInterestsSubject.asObservable();
  public theatreInterests: Observable<
    Theatre[]
  > = this.theatreInterestsSubject.asObservable();

  constructor(
    @Inject(HTTP_SERVICE_CONFIG) private config: HttpServiceConfig,
    private httpClient: HttpClient
  ) {}

  public getUser(id: string): Observable<Profile> {
    return this.httpClient
      .get<Attempt<User>>(`${this.config.apiUrl}/${this.endpoint}/${id}`)
      .pipe(
        map((response: Attempt<User>) => {
          if (response.failure) return;

          let user = response.result;

          this.profileSubject.next(user);
          this.categoryInterestsSubject.next(user.categories);
          this.planInterestsSubject.next(user.plans);
          this.theatreInterestsSubject.next(user.theatres);

          return user;
        })
      );
  }

  public addOrRemoveCategory(categories: any[], category: any): void {}

  public addOrRemovePlan(plans: Plan[], plan: Plan): void {
    let found = false;

    for (let i = plans.length - 1; i >= 0; i--) {
      let item = plans[i];
      if (item.id !== plan.id) continue;
      found = true;
      plans.splice(i, 1);
    }

    if (!found) plans.push(plan);

    this.planInterestsSubject.next(plans);
  }

  public addOrRemoveTheatre(theatres: Theatre[], theatre: Theatre): void {
    let found = false;

    for (let i = theatres.length - 1; i >= 0; i--) {
      let item = theatres[i];
      if (item.id !== theatre.id) continue;
      found = true;
      theatres.splice(i, 1);
    }

    if (!found) theatres.push(theatre);

    this.theatreInterestsSubject.next(theatres);
  }
}
