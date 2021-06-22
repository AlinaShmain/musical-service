import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { hamburgerAnimation } from "../animations/hamburger-menu";
import { UsersService } from "../services/users/users.service";
import { AppState, selectMainPageState } from "../store/state/app.state";
import { MainPageState } from "../store/state/main-page.state";

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

  mainPageState: Observable<MainPageState> = this.store.select(selectMainPageState);

  constructor(public dialog: MatDialog, private usersService: UsersService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log("init main component");

    // this.store.select(selectMainPageState).pipe(
    //   takeUntil(this.destroy$),
    // ).subscribe((mainPageState) => {
    //   console.log("update mainPageState");
    //   this.mainPageState = mainPageState;
    //   this.cdr.markForCheck();
    // });
  }

  ngOnDestroy(): void {
    console.log("main on destroy");
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

}
