import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { hamburgerAnimation } from "../animations/hamburger-menu";
import { AuthModalComponent } from "../auth-modal/auth-modal.component";
import { AuthActions } from "../store/actions";
import { AppState } from "../store/state/app.state";

interface Link {
  pageName: string;
  path: string;
  iconName: string;
}
@Component({
  selector: "ms-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  animations: [
    hamburgerAnimation.animeTrigger,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  returnUrl: string;

  isOpenMenu: boolean = false;
  @ViewChild(MatSidenav) private sidenav: MatSidenav;
  isHamburguer: boolean = true;

  links: Link[] = [
    {
      pageName: "Home",
      path: "tracks",
      iconName: "home",
    },
    {
      pageName: "Artists",
      path: "artists",
      iconName: "mic_external_on",
    },
    {
      pageName: "Albums",
      path: "albums",
      iconName: "album",
    },
    {
      pageName: "Favourites",
      path: "favourites",
      iconName: "grade",
    },
    {
      pageName: "Playlists",
      path: "playlists",
      iconName: "playlist_play",
    },
  ];

  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log("home component");
    console.log(this.router.url);
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnDestroy(): void {
    console.log("home on destroy");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOpenMenu(): void {
    this.isHamburguer = !this.isHamburguer;
    this.sidenav.toggle();
  }

  onOpenModal(): void {
    console.log("on open");
    this.store.dispatch(AuthActions.setIsOpenAuthModal({ isOpenAuthModal: true }));

    const dialogRef = this.dialog.open(AuthModalComponent, {});
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.log("after close modal");
      this.router.navigateByUrl(this.returnUrl);
    });
  }

}
