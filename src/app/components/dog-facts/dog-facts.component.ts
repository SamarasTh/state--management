import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dog-facts',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './dog-facts.component.html',
  styleUrl: './dog-facts.component.scss',
})
export class DogFactsComponent {
  reload$ = new BehaviorSubject<void>(undefined);
  dogApi$?: Observable<any>;
  
  constructor(private httpClient: HttpClient) {}

  url = 'https://dogapi.dog/api/v1/facts';

  ngOnInit() {
    this.dogApi$ = this.reload$.pipe(switchMap(() => this.getDogsApiData()));
  }

  getDogsApiData(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  fetchAnotherFact() {
    this.reload$.next();
  }
}
