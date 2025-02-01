import {Component, OnInit} from "@angular/core";
import {Button} from "primeng/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ROUTING_PATH} from "../../config/config";
import {IMenuItem} from "../../models/model.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    Button,
    RouterLink,
    RouterOutlet
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  menuItems: IMenuItem[] = [
    {
      label: 'Users',
      icon: 'pi pi-user',
      routerLink: [ROUTING_PATH.user],
    },
    {
      label: 'Products (покупок)',
      icon: 'pi pi-list',
      routerLink: [ROUTING_PATH.product],
    },
    {
      label: 'Categories',
      icon: 'pi pi-tags',
      routerLink: [ROUTING_PATH.category],
    },
  ]

  ngOnInit(): void {
  }
}
