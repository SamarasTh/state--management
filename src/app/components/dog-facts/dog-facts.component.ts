import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dog-facts',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './dog-facts.component.html',
  styleUrl: './dog-facts.component.scss',
})
export class DogFactsComponent {
  dogApi$?: Observable<any>;

  constructor(private httpClient: HttpClient) {}

  url = 'https://dogapi.dog/api/v1/facts';

  ngOnInit() {
    this.dogApi$ = this.getDogsApiData();
  }

  getDogsApiData(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  fetchAnotherFact() {
    this.dogApi$ = this.getDogsApiData();
  }
}
