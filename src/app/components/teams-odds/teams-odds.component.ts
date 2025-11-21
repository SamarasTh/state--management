import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

interface Team {
  name: string;
  odds: number;
  leagueId: number;
  previousOdds?: number;
}
interface League {
  id: number;
  name: string;
  logo?: string;
}
interface LeagueWithTeams extends League {
  teams: Team[];
}

@Component({
  selector: 'app-teams-odds',
  standalone: true,
  templateUrl: './teams-odds.component.html',
  styleUrls: ['./teams-odds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsOddsComponent {
  groupedLeagues = computed(() => this.getGroupedLeagues());

  private platformId = inject(PLATFORM_ID);

  leagues = signal<League[]>([
    {
      name: 'Premier League',
      id: 1,
      logo: 'https://yt3.googleusercontent.com/zhPMOpUIlmMa_xAgrHYGYrkCSWS-3tE0yPPKVUzh1iiYOF1QDqGtg3ZIbWXjkNmN3l3WPqziRHE=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      name: 'La Liga',
      id: 2,
      logo: 'https://1000logos.net/wp-content/uploads/2019/01/Spanish-La-Liga-Logo.jpg',
    },
  ]);

  teams = signal<Team[]>([
    { name: 'Man Utd', odds: 1.0, leagueId: 1 },
    { name: 'Liverpool', odds: 1.0, leagueId: 1 },
    { name: 'Chelsea', odds: 1.0, leagueId: 1 },
    { name: 'Newcastle', odds: 1.0, leagueId: 1 },
    { name: 'Arsenal', odds: 1.0, leagueId: 1 },
    { name: 'West Ham', odds: 1.0, leagueId: 1 },
    { name: 'Real Madrid', odds: 1.0, leagueId: 2 },
    { name: 'Barcelona', odds: 1.0, leagueId: 2 },
    { name: 'Valencia', odds: 1.0, leagueId: 2 },
    { name: 'Rayo Vallecano', odds: 1.0, leagueId: 2 },
    { name: 'Atletico Madrid', odds: 1.0, leagueId: 2 },
  ]);

  constructor() {
    this.updateOddsEffect();
  }

  updateOddsEffect() {
    if (!isPlatformBrowser(this.platformId)) return;

    effect(() => {
      const interval = setInterval(() => {
        this.teams.update((teams) =>
          teams.map((team) => {
            const change = (Math.random() - 0.5) * 0.2;
            const newOdds = +(team.odds + change).toFixed(2);
            return {
              ...team,
              previousOdds: team.odds,
              odds: newOdds > 0 ? newOdds : team.odds,
            };
          }),
        );
      }, 2000);

      return () => clearInterval(interval);
    });
  }

  getGroupedLeagues() {
    return this.leagues().map((league) => ({
      ...league,
      teams: this.teams().filter((team) => team.leagueId === league.id),
    }));
  }
}
