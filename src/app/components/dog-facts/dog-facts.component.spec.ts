import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogFactsComponent } from './dog-facts.component';

describe('DogFactsComponent', () => {
  let component: DogFactsComponent;
  let fixture: ComponentFixture<DogFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogFactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
