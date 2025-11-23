import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Product, ProductResponse } from '../../model/product/product';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private productApiService = inject(ProductApiService);

  searchControl = new FormControl('');
  products = signal<Product[]>([]);
  ranOnce = signal(false);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        map((term) => term?.trim() || ''),
        tap((term) => this.resetSearch(term)),

        filter((term) => term.length >= 3),
        debounceTime(300),
        distinctUntilChanged(),

        switchMap((term) => this.productApiService.searchProducts(term)),
        map((res: ProductResponse) => res.products || []),
      )
      .subscribe((data) => {
        this.products.set(data);
        console.log('Search results:', this.products);
        this.ranOnce.set(true);
      });
  }

  trackById(index: number, product?: Product) {
    return product?.id ?? index;
  }

  resetSearch(term: string) {
    if (term.length === 0) {
      this.products.set([]);
    }
  }
}
