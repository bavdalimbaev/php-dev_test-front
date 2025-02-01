import {Injectable, effect, signal} from '@angular/core'
import {Subject} from 'rxjs'

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  title: string = 'PHP dev test'//|'Швейный Цех'

  _config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  }

  config = signal<AppConfig>(this._config)

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  }

  private overlayOpen: Subject<any> = new Subject<any>()

  overlayOpen$ = this.overlayOpen.asObservable()

  constructor() {
    effect((): void => {
      this.state.overlayMenuActive = sessionStorage.getItem('state.overlayMenuActive') == 'true'
      this.state.staticMenuDesktopInactive = sessionStorage.getItem('state.staticMenuDesktopInactive') == 'true'
      this.state.staticMenuMobileActive = true
      if (!this.isDesktop()) {
        this.onMenuToggle()
      }
    })
  }

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive
      sessionStorage.setItem('state.overlayMenuActive', this.state.overlayMenuActive ? 'true' : 'false')
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null)
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive
      sessionStorage.setItem('state.staticMenuDesktopInactive', this.state.staticMenuDesktopInactive ? 'true' : 'false')
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null)
      }
    }
  }

  showProfileSidebar(): void {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null)
    }
  }

  isOverlay(): boolean {
    return this.config().menuMode === 'overlay'
  }

  isDesktop(): boolean {
    return window.innerWidth > 991
  }
}
