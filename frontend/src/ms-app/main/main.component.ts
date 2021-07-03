import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { hamburgerAnimation } from "../animations/hamburger-menu";
import { Link } from "../models/link";
import { UsersService } from "../services/users/users.service";
import { AuthActions, MainPageActions } from "../store/actions";
import { AppState, selectAuthState } from "../store/state/app.state";
import { AuthState } from "../store/state/auth.state";

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

  isOpenMenu: boolean = false;
  @ViewChild(MatSidenav) private sidenav: MatSidenav;
  isHamburguer: boolean = true;

  links: Link[] = [
    {
      pageName: "Home",
      path: "home",
      // iconName: "home",
      iconName: "fas fa-home",
      auth: false,
    },
    {
      pageName: "Artists",
      path: "artists",
      // iconName: "mic_external_on",
      iconName: "fas fa-music",
      auth: false,
    },
    {
      pageName: "Albums",
      path: "albums",
      // iconName: "album",
      iconName: "fas fa-record-vinyl",
      auth: false,
    },
    {
      pageName: "Favourites",
      path: "favourites",
      // iconName: "grade",
      iconName: "fas fa-star",
      auth: true,
    },
    {
      pageName: "Playlists",
      path: "playlists",
      // iconName: "playlist_play",
      iconName: "fas fa-list",
      auth: false,
    },
    {
      pageName: "My Playlists",
      path: "user-playlists",
      // iconName: "playlist_play",
      iconName: "fas fa-list",
      auth: true,
    },
  ];

  isOpenDropdown: boolean = false;

  private destroy$ = new Subject<void>();

  authState: AuthState;

  constructor(public dialog: MatDialog, private usersService: UsersService,
    private store: Store<AppState>, private cdr: ChangeDetectorRef, private router: Router) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      ).subscribe((event) => {
        if (event instanceof NavigationEnd && !event.url.includes("form")) {
          console.log("prev:", event.url);
          this.store.dispatch(MainPageActions.setReturnUrl({ returnUrl: event.url }));
        }
      });
  }

  ngOnInit(): void {
    console.log("init main component");

    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(AuthActions.getUserInfo({ token }));

    // this.store.dispatch(AuthActions.verifyUser());
    this.store.select(selectAuthState).pipe(
      takeUntil(this.destroy$),
    ).subscribe((authState) => {
      console.log("update authState");
      this.authState = authState;
      this.cdr.markForCheck();
    });
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

  isAuthenticated(): boolean {
    return this.usersService.isAuthenticated();
  }

  getUserName(): string {
    return this.usersService.getUserName();
  }

  onDropdown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  onLogout(event: Event): void {
    console.log("on Logout");
    // event.preventDefault();

    this.usersService?.clearLocStore();
    this.store.dispatch(AuthActions.logoutUser());

    this.router.navigateByUrl("/main/home");
  }

}
