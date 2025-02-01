import {Component, inject, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {SkeletonComponent} from "../../utils/features/skeleton/skeleton.component";
import {ISuccess} from "../../config/response.interface";
import {ApiService} from "../../service/app/api.service";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ProductService} from "../../service/rest/product/product.service";
import {IProduct, IProductCategory, IProductCreate} from "../../service/rest/product/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [
    DialogModule,
    Button,
    FloatLabelModule,
    TableModule,
    SkeletonComponent,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
  ],
  providers: [
    ProductService,
    ApiService,
  ],
  standalone: true
})
export class ProductComponent extends NotifyAbstract implements OnInit {
  private productService: ProductService = inject(ProductService)

  products: IProduct[]
  modalProduct?: IProduct
  modalCreate: boolean = false
  modalCategory: boolean = false
  modalUpdate: number

  loading: boolean = true


  title: string
  description: string
  price: number
  user_id: number

  productId: number
  categoryOne: number
  categoryTwo: number


  ngOnInit(): void {
    this.getList()
  }

  private getList(): void {
    this.loading = true
    this.productService.getList()
      .subscribe({
        next: (items: IProduct[]): void => {
          this.products = items
        }
      }).add((): boolean => this.loading = false)
  }

  delete(item: IProduct): void {
    this.modalProduct = undefined
    this.productService.delete(item.id)
      .subscribe({
        next: (_data: ISuccess): void => {
          this.instant('success', 'Вы успешно удалили ' + item.title + '.')
          const index: number = this.products.findIndex((product: IProduct): boolean => product.id == item.id)
          this.products.splice(index, 1)
        }
      })
  }

  setProduct(product: IProduct): void {
    this.modalCreate = true
    this.modalUpdate = product.id
    this.title = product.title ?? ''
    this.description = product.description ?? ''
    this.price = product.price ?? ''
    this.user_id = product.user_id ?? ''
  }

  create() {
    const data: IProductCreate = {
      title: this.title,
      description: this.description,
      price: this.price,
      user_id: this.user_id,
    }
    this.productService.create(data)
      .subscribe({
        next: (product: IProduct): void => {
          this.products.unshift(product)
          this.instant('success', 'success create')
          this.clearForm()
        }
      })
  }

  update() {
    const data: IProductCreate = {
      title: this.title,
      description: this.description,
      price: this.price,
      user_id: this.user_id,
    }
    this.productService.update(this.modalUpdate, data)
      .subscribe({
        next: (_user: IProduct): void => {
          this.getList()
          this.instant('success', 'success update')
          this.clearForm()
        }
      })
  }

  clearForm() {
    this.modalCreate = false
    this.title = ''
    this.description = ''
    this.price = 0
    this.user_id = 0
    this.modalUpdate = 0
    this.productId = 0
    this.categoryOne = 0
    this.categoryTwo = 0
  }

  createCategories() {
    const data: IProductCategory = {
      category_ids: [this.categoryOne, this.categoryTwo],
    }
    this.productService.category(this.productId, data)
      .subscribe({
        next: (_user: IProduct): void => {
          this.getList()
          this.instant('success', 'success merged')
          this.clearForm()
        }
      })
  }
}
