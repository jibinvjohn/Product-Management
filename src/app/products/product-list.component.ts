import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  BehaviorSubject,
  EMPTY,
  Subject,
  catchError,
  combineLatest,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) => {
      return products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      );
    }),
    tap((products) => console.log(products)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  category$ = this.productCategoryService.productCategory$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // productSimpleFilter$ = this.products$.pipe(
  //   map((product) =>
  //     product.filter((item) =>
  //       this.selectedCategoryId
  //         ? item.categoryId === this.selectedCategoryId
  //         : true
  //     )
  //   )
  // );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
