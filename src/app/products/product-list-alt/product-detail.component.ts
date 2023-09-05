import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, Subject, catchError } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';

  productSuppliers: Supplier[] | null = null;

  private errorMessageSubject = new Subject<string>();
  errorMessageStream$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.selectedProduct$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) {}
}
