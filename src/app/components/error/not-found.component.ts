import {Component, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true
})
export class NotFoundComponent extends NotifyAbstract implements OnInit {
  ngOnInit(): void {
  }
}
