import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsOddsComponent } from './teams-odds.component';

describe('TeamsOddsComponent', () => {
  let component: TeamsOddsComponent;
  let fixture: ComponentFixture<TeamsOddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsOddsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
