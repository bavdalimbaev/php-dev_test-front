import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastModule} from "primeng/toast";
import {PusherService} from "./service/app/pusher/pusher.service";
import {NotifyAbstract} from "./service/app/notify.abstract";
import {IUserInfo} from "./service/rest/user/user.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent extends NotifyAbstract implements OnInit {
  title = 'php-dev_test-front';

  private pusherService: PusherService = inject(PusherService)

  ngOnInit() {
    this.pusherService.bindEvent('user.created', (data: {user: IUserInfo}) => {
      this.instant('info', 'created new user ' + data.user.name)
    })
  }
}
