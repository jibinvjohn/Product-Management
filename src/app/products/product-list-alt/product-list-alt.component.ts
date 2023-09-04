import { Component, OnInit, OnDestroy } from '@angular/core';

import { EMPTY, Subscription, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$ = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
