import {Component, Input, OnInit} from '@angular/core'
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-skeleton',
  templateUrl: 'skeleton.component.html',
  imports: [
    SkeletonModule,
    TableModule
  ],
  standalone: true
})
export class SkeletonComponent implements OnInit {
  @Input() type: 'table'|'list'|'card'|'form' = 'card'

  data: any[]
  ngOnInit(): void {
    if (this.type == 'table') {
      this.data = Array.from({length: 8}).map((_, i) => `Item #${i}`)
    }
  }
}
