import { DogFactsComponent } from './components/dog-facts/dog-facts.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'teams',
        loadComponent: () =>
          import('./components/teams-odds/teams-odds.component').then(
            (m) => m.TeamsOddsComponent,
          ),
      },
      {
        path: 'dog-facts',
        loadComponent: () =>
          import('./components/dog-facts/dog-facts.component').then(
            (m) => DogFactsComponent,
          ),
      },
    ],
  },
];
