import { Observable, of } from 'rxjs';
import { Product, ProductResponse } from '../model/product/product';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

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
}
