import {Component, OnInit} from "@angular/core";
import {NotifyAbstract} from "../../service/app/notify.abstract";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true
})
export class ProductComponent extends NotifyAbstract implements OnInit {
  ngOnInit(): void {
  }
}
