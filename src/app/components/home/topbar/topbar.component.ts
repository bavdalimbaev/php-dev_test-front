import {Component, ElementRef, inject, ViewChild} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {UntilDestroy} from "@ngneat/until-destroy";
import {LayoutService} from "../../../service/app/layout.service";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ]
})
export class TopbarComponent {
  public layoutService: LayoutService = inject(LayoutService)
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef
}
