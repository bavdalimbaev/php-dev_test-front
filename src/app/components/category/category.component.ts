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
import {CategoryService} from "../../service/rest/category/category.service";
import {ICategory, ICategoryCreate, ICategoryProduct} from "../../service/rest/category/category.interface";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
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
    CategoryService,
    ApiService,
  ],
  standalone: true
})
export class CategoryComponent extends NotifyAbstract implements OnInit {
  private categoryService: CategoryService = inject(CategoryService)

  categories: ICategory[]
  modalCategory?: ICategory
  modalCreate: boolean = false
  modalProduct: boolean = false
  modalUpdate: number

  loading: boolean = true

  categoryId: number
  productTwo: number
  productOne: number

  title: string

  ngOnInit(): void {
    this.getList()
  }

  private getList(): void {
    this.loading = true
    this.categoryService.getList()
      .subscribe({
        next: (items: ICategory[]): void => {
          this.categories = items
        }
      }).add((): boolean => this.loading = false)
  }

  delete(item: ICategory): void {
    this.modalCategory = undefined
    this.categoryService.delete(item.id)
      .subscribe({
        next: (_data: ISuccess): void => {
          this.instant('success', 'Вы успешно удалили ' + item.title + '.')
          const index: number = this.categories.findIndex((category: ICategory): boolean => category.id == item.id)
          this.categories.splice(index, 1)
        }
      })
  }

  setCategory(category: ICategory): void {
    this.modalCreate = true
    this.modalUpdate = category.id
    this.title = category.title ?? ''
  }

  create() {
    const data: ICategoryCreate = {
      title: this.title,
    }
    this.categoryService.create(data)
      .subscribe({
        next: (category: ICategory): void => {
          this.categories.unshift(category)
          this.instant('success', 'success create')
          this.clearForm()
        }
      })
  }

  update() {
    const data: ICategoryCreate = {
      title: this.title,
    }
    this.categoryService.update(this.modalUpdate, data)
      .subscribe({
        next: (_user: ICategory): void => {
          this.getList()
          this.instant('success', 'success update')
          this.clearForm()
        }
      })
  }

  clearForm() {
    this.modalCreate = false
    this.title = ''
    this.modalUpdate = 0
    this.categoryId = 0
    this.productOne = 0
    this.productTwo = 0
    this.modalProduct = false
  }

  createProducts() {
    const data: ICategoryProduct = {
      product_ids: [Number(this.productOne), Number(this.productTwo)],
    }
    this.categoryService.product(this.categoryId, data)
      .subscribe({
        next: (_user: ICategory): void => {
          this.getList()
          this.instant('success', 'success merged')
          this.clearForm()
        }
      })
  }
}
