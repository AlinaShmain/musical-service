import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ValidationErrorsComponent } from "../auth-modal/validation-errors/validation-errors.component";
import { Playlist } from "../models/playlist";
import { UsersService } from "../services/users/users.service";
import { AuthActions } from "../store/actions";
import { AppState, selectIsCreated } from "../store/state/app.state";

@Component({
  selector: "ms-create-playlist-modal",
  templateUrl: "./create-playlist-modal.component.html",
  styleUrls: ["./create-playlist-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistModalComponent extends ValidationErrorsComponent implements OnInit, OnDestroy {

  trackId: string;

  formModel: FormGroup;
  title: FormControl;
  description: FormControl;

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private dialogRef: MatDialogRef<CreatePlaylistModalComponent>,
    private _fb: FormBuilder, private cdr: ChangeDetectorRef, private usersService: UsersService,
    private store: Store<AppState>) {
    super();

    const param = this.router.url.split("?")[1];
    this.trackId = param.split("=")[1];

    this.title = this._fb.control("", [Validators.required, Validators.maxLength(20)]);
    this.description = this._fb.control("");

    this.formModel = this._fb.group({
      title: this.title,
      description: this.description,
    });
  }

  ngOnInit(): void {
    console.log("create playlists init", this.trackId);

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log("value change");
      this.errors = [];
      this.calculateErrors(this.formModel);
      this.cdr.markForCheck();
    });

    this.calculateErrors(this.formModel);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createPlaylist(playlistInfo: Playlist): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(AuthActions.createPlaylist({ playlistInfo, token }));

    this.store.select(selectIsCreated).pipe(
      takeUntil(this.destroy$),
    ).subscribe((isCreated) => {
      if (isCreated) {
        this.onClose();
      }
    });
  }

  onSubmit(event: Event): void {
    console.log("on submit", this.errors);
    event.preventDefault();
    // this.submitted = true;

    if (this.errors.length === 0) {
      const { title, description } = this.formModel.value;

      const id = (this.usersService.getPlaylistIds().length + 1).toString();

      const playlistInfo = {
        id, title, description, trackIds: [this.trackId], creatorId: "", totalLikes: "", imagesPath: [],
      };

      console.log("on submit form", playlistInfo);
      this.createPlaylist(playlistInfo);
    }
  }

}
