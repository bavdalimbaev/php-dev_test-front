import {Component, inject} from '@angular/core'
import {UntilDestroy} from "@ngneat/until-destroy";
import {LayoutService} from "../../../service/app/layout.service";

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true
})
export class FooterComponent {
  protected layoutService: LayoutService = inject(LayoutService)
}
