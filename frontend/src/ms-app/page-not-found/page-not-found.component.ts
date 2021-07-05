import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ms-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  onReturn(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

}
