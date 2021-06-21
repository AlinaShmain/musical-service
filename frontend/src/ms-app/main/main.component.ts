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
import { MainPageActions } from "../store/actions";
import { AppState, selectReturnUrl } from "../store/state/app.state";

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
      path: "home",
      // iconName: "home",
      iconName: "fas fa-home",
    },
    {
      pageName: "Artists",
      path: "artists",
      // iconName: "mic_external_on",
      iconName: "fas fa-music",
    },
    {
      pageName: "Albums",
      path: "albums",
      // iconName: "album",
      iconName: "fas fa-record-vinyl",
    },
    {
      pageName: "Favourites",
      path: "favourites",
      // iconName: "grade",
      iconName: "fas fa-star",
    },
    {
      pageName: "Playlists",
      path: "playlists",
      // iconName: "playlist_play",
      iconName: "fas fa-list",
    },
  ];

  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log("init main component");
    // console.log(this.router.url);
    // this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
    //   console.log("return url", params);
    //   this.returnUrl = params.returnUrl;
    // });

    this.store.select(selectReturnUrl).pipe(
      takeUntil(this.destroy$),
    ).subscribe((returnUrl) => {
      console.log("update returnUrl", returnUrl);
      this.returnUrl = returnUrl;
    });

    // this.store.select(selectIsOpenAuthModal).pipe(
    //   takeUntil(this.destroy$),
    // ).subscribe((isOpenAuthModal) => {
    //   console.log("update isOpenAuthModal", isOpenAuthModal);
    //   // console.log("update returnUrl", mainPageState.returnUrl);
    //   // this.mainPageState = mainPageState;
    //   // if (isOpenAuthModal) {
    //   //   this.createAuthDialog();
    //   // }
    // });
  }

  ngOnDestroy(): void {
    console.log("main on destroy");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOpenMenu(): void {
    this.isHamburguer = !this.isHamburguer;
    this.sidenav.toggle();
  }

  createAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthModalComponent, {});
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.log("after close modal");
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  onOpenModal(): void {
    console.log("on open");
    this.store.dispatch(MainPageActions.setIsOpenAuthModal({ isOpenAuthModal: true }));

    this.createAuthDialog();
  }

}
