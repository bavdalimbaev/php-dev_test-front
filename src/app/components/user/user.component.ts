import {Component, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true
})
export class UserComponent extends NotifyAbstract implements OnInit {
    ngOnInit(): void {
    }
}
