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
    ],
  },
];
