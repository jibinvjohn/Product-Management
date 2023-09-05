import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, Subject, catchError, combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';

  productSuppliers$ = this.productService.selectedProductSupplier$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  private errorMessageSubject = new Subject<string>();
  errorMessageStream$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.selectedProduct$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  pageTitle$ = this.products$.pipe(
    map((p) => (p ? `Product Detail for: ${p.productName}` : `Product Detail`))
  );

  vm$ = combineLatest([
    this.products$,
    this.productSuppliers$,
    this.pageTitle$,
  ]).pipe(
    filter((product) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle,
    }))
  );
  constructor(private productService: ProductService) {}
}
