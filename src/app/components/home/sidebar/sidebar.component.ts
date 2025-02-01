import {Component, ElementRef, inject, OnInit} from '@angular/core'
import {ROUTING_PATH} from "../../../config/config";
import {SidebarItemComponent} from "./sidebar-item/sidebar-item.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    SidebarItemComponent,
  ]
})
export class SidebarComponent implements OnInit {
  public el: ElementRef = inject(ElementRef)
  model: any[]

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
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
      }
    ]
  }
}

