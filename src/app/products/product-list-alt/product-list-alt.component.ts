import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { EMPTY, Subject, Subscription, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  pageTitle = 'Products';

  private errorMessageSubject = new Subject<string>();
  errorMessageStream$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$;

  products$ = this.productService.productsWithCategory$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.selectedProductChange(productId);
  }
}
