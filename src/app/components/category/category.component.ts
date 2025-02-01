import {Component, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true
})
export class CategoryComponent extends NotifyAbstract implements OnInit {
  ngOnInit(): void {
  }
}
