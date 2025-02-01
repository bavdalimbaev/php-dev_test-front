import {Component, inject, OnDestroy, OnInit, Renderer2, ViewChild} from "@angular/core";
import {UntilDestroy} from "@ngneat/until-destroy";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {LayoutService} from "../../../service/app/layout.service";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {TopbarComponent} from "../topbar/topbar.component";
import {NgClass} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  standalone: true,
  imports: [
    TopbarComponent,
    SidebarComponent,
    NgClass,
    RouterOutlet,
    FooterComponent
  ]
})

export class LayoutComponent implements OnInit, OnDestroy {
  public layoutService: LayoutService = inject(LayoutService)
  public renderer: Renderer2 = inject(Renderer2)
  public router: Router = inject(Router)

  overlayMenuOpenSubscription: Subscription

  menuOutsideClickListener: any

  profileMenuOutsideClickListener: any

  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent

  @ViewChild(TopbarComponent) appTopbar!: TopbarComponent

  ngOnInit(): void {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe((): void => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event): void => {
          const isOutsideClicked: boolean = !(this.appSidebar.el.nativeElement.isSameNode(event.target)
            || this.appSidebar.el.nativeElement.contains(event.target)
            || this.appTopbar.menuButton.nativeElement.isSameNode(event.target)
            || this.appTopbar.menuButton.nativeElement.contains(event.target))

          if (isOutsideClicked) {
            this.hideMenu()
          }
        })
      }

      if (!this.profileMenuOutsideClickListener) {
        this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', (event): void => {
          const isOutsideClicked: boolean = !(this.appTopbar.menu.nativeElement.isSameNode(event.target)
            || this.appTopbar.menu.nativeElement.contains(event.target)
            || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target)
            || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target))

          if (isOutsideClicked) {
            this.hideProfileMenu()
          }
        })
      }

      if (this.layoutService.state.staticMenuMobileActive) {
        this.blockBodyScroll()
      }
    })

    this.router.events.pipe(filter((event): boolean => event instanceof NavigationEnd))
      .subscribe((): void => {
        this.hideMenu()
        this.hideProfileMenu()
      })
  }

  hideMenu(): void {
    this.layoutService.state.overlayMenuActive = false
    this.layoutService.state.staticMenuMobileActive = false
    this.layoutService.state.menuHoverActive = false
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener()
      this.menuOutsideClickListener = null
    }
    this.unblockBodyScroll()
  }

  hideProfileMenu(): void {
    this.layoutService.state.profileSidebarVisible = false
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener()
      this.profileMenuOutsideClickListener = null
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll')
    } else {
      document.body.className += ' blocked-scroll'
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll')
    } else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
        'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive
        && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
    }
  }

  ngOnDestroy(): void {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe()
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener()
    }
  }
}
