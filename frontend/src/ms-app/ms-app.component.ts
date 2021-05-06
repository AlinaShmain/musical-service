import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";

@Component({
    selector: "ms-app-root",
    templateUrl: "./ms-app.component.html",
    styleUrls: ["./ms-app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsAppComponent {
    title = 123;
}
