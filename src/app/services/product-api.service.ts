import { Observable, of } from 'rxjs';
import { Product, ProductResponse } from '../model/product/product';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private httpClient: HttpClient) {}

  searchProducts(term: string): Observable<ProductResponse> {
    const url = `${this.apiUrl}/search?q=${encodeURIComponent(term)}`;
    return this.httpClient.get<ProductResponse>(url).pipe(
      catchError((err) => {
        console.error('API call failed', err);
        return of({ products: [] });
      }),
    );
  }

  search(term: string) {
    if (!term || term.length < 3) {
      return of([]); 
    }

    return this.searchProducts(term).pipe(
      map((res: ProductResponse) => res.products || []),
    );
  }
}
