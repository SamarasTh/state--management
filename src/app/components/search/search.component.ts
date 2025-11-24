import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { HighlightDirective } from '../../highlight.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../model/product/product';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HighlightDirective,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  productApiService = inject(ProductApiService);
  destroy$ = new Subject<void>();
  blue$ = new BehaviorSubject<number>(3);

  searchControl = new FormControl('');
  products = signal<Product[]>([]);
  ranOnce = signal(false);

  ngOnInit() {
    this.setupSearchStream().subscribe((products) => {
      this.products.set(products);
      this.ranOnce.set(true);
      console.log('Search results:', this.products);
    });
  }

  resetSearch(term: string) {
    if (term.length === 0) {
      this.products.set([]);
    }
  }

  setupSearchStream(): Observable<Product[]> {
    return this.searchControl.valueChanges.pipe(
      map((term) => term?.trim() || ''),
      tap((term) => this.resetSearch(term)),
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length > 2),
      switchMap((term) => this.productApiService.search(term)),
      takeUntil(this.destroy$),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
