import {Component, HostBinding, inject, Input, OnDestroy, OnInit} from '@angular/core'
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router'
import {Subscription} from 'rxjs'
import {filter} from 'rxjs/operators'
import {UntilDestroy} from '@ngneat/until-destroy'
import {MenuChangeEvent} from "../../../../service/app/app.interface";
import {MenuService} from "../../../../service/app/menu.service";
import {NgClass, NgForOf} from "@angular/common";
import {Ripple} from "primeng/ripple";

@UntilDestroy({checkProperties: true})
@Component({
  selector: '[app-sidebaritem]',
  templateUrl: 'sidebar-item.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    Ripple
  ]
})
export class SidebarItemComponent implements OnInit, OnDestroy {
  public router: Router = inject(Router)
  private menuService: MenuService = inject(MenuService)

  @Input() item: any
  @Input() index!: number
  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean
  @Input() parentKey!: string

  active: boolean = false

  public menuSourceSubscription: Subscription

  public menuResetSubscription: Subscription

  key: string = ''

  ngOnInit(): void {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe((value: MenuChangeEvent): void => {
      Promise.resolve(null).then((): void => {
        if (value.routeEvent) {
          this.active = (value.key === this.key || value.key.startsWith(this.key + '-'))
        } else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false
          }
        }
      })
    })

    this.menuResetSubscription = this.menuService.resetSource$.subscribe((): void => {
      this.active = false
    })

    this.router.events.pipe(filter((event): boolean => event instanceof NavigationEnd))
      .subscribe((_params): void => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute()
        }
      })

    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index)

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute()
    }
  }

  updateActiveStateFromRoute(): void {
    const activeRoute: boolean = this.router.isActive(this.item.routerLink[0],
      {paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored'})

    if (activeRoute) {
      this.menuService.onMenuStateChange({key: this.key, routeEvent: true})
    }
  }

  itemClick(event: Event): void {
    if (this.item.disabled) {
      event.preventDefault()
      return
    }

    if (this.item.command) {
      this.item.command({originalEvent: event, item: this.item})
    }

    if (this.item.items) {
      this.active = !this.active
    }

    this.menuService.onMenuStateChange({key: this.key})
  }

  get submenuAnimation(): string {
    return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed')
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root
  }

  ngOnDestroy(): void {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe()
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe()
    }
  }
}
