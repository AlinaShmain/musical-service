import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UsersService } from "../services/users/users.service";
import { FavouritesPageActions } from "../store/actions";
import { AppState } from "../store/state/app.state";

@Component({
  selector: "ms-favourite-list",
  templateUrl: "./favourite-list.component.html",
  styleUrls: ["./favourite-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteListComponent implements OnInit {

  favouriteList$: string[] = [];

  constructor(private store: Store<AppState>, private usersService: UsersService) { }

  ngOnInit(): void {
    console.log("favourites component init");

    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(FavouritesPageActions.loadFavourites({ token }));
  }

}
