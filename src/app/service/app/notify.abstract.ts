import {MessageService} from "primeng/api";
import {inject} from "@angular/core";

export abstract class NotifyAbstract {
  protected notify: MessageService = inject(MessageService)

  protected instant(severity: 'success'|'info'|'warn'|'error'|'secondary', detail: string) {
    const summary: string = this.upperFirst(severity)
    this.notify.add({severity, summary, detail})
  }

  private upperFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
