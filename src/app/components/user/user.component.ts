import {Component, inject, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {SkeletonComponent} from "../../utils/features/skeleton/skeleton.component";
import {UserService} from "../../service/rest/user/user.service";
import {IUserCreate, IUserInfo} from "../../service/rest/user/user.interface";
import {ISuccess} from "../../config/response.interface";
import {ApiService} from "../../service/app/api.service";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
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
    UserService,
    ApiService,
  ],
  standalone: true
})
export class UserComponent extends NotifyAbstract implements OnInit {
  private userService: UserService = inject(UserService)

  users: IUserInfo[]
  modalUser?: IUserInfo
  modalCreate: boolean = false
  modalUpdate: number

  loading: boolean = true


  name: string
  email: string
  password: string
  bio?: string


  ngOnInit(): void {
    this.getList()
  }

  private getList(): void {
    this.loading = true
    this.userService.getList()
      .subscribe({
        next: (items: IUserInfo[]): void => {
          this.users = items
        }
      }).add((): boolean => this.loading = false)
  }

  delete(user: IUserInfo): void {
    this.modalUser = undefined
    this.userService.delete(user.id)
      .subscribe({
        next: (_data: ISuccess): void => {
          this.instant('success', 'Вы успешно удалили ' + user.name + '.')
          const index: number = this.users.findIndex((item: IUserInfo): boolean => item.id == user.id)
          this.users.splice(index, 1)
        }
      })
  }

  setUser(user: IUserInfo): void {
    this.modalCreate = true
    this.modalUpdate = user.id
    this.name = user.name ?? ''
    this.email = user.email ?? ''
    this.password = user.password ?? ''
    this.bio = user?.profile?.bio ?? ''
  }

  create() {
    const data: IUserCreate = {
      name: this.name,
      email: this.email,
      password: this.password,
      bio: this.bio,
    }
    this.userService.create(data)
      .subscribe({
        next: (user: IUserInfo): void => {
          this.users.unshift(user)
          this.instant('success', 'success create')
          this.clearForm()
        }
      })
  }

  update() {
    const data: IUserCreate = {
      name: this.name,
      email: this.email,
      password: this.password,
      bio: this.bio,
    }
    this.userService.update(this.modalUpdate, data)
      .subscribe({
        next: (_user: IUserInfo): void => {
          this.getList()
          this.instant('success', 'success update')
          this.clearForm()
        }
      })
  }

  clearForm() {
    this.modalCreate = false
    this.name = ''
    this.email = ''
    this.password = ''
    this.bio = ''
    this.modalUpdate = 0
  }
}
