import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ValidationErrorsComponent } from "../auth-modal/validation-errors/validation-errors.component";
import { Playlist } from "../models/playlist";
import { UsersService } from "../services/users/users.service";
import { AuthActions } from "../store/actions";
import { AppState, selectIsEdited } from "../store/state/app.state";

@Component({
  selector: "ms-edit-playlist-modal",
  templateUrl: "./edit-playlist-modal.component.html",
  styleUrls: ["./edit-playlist-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlaylistModalComponent extends ValidationErrorsComponent implements OnInit, OnDestroy {

  formModel: FormGroup;
  title: FormControl;
  description: FormControl;

  playlistId: string;

  private destroy$ = new Subject<void>();

  constructor(private dialogRef: MatDialogRef<EditPlaylistModalComponent>, private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Playlist, private cdr: ChangeDetectorRef, private router: Router,
    private store: Store<AppState>, private usersService: UsersService) {
      super();
      this.title = this._fb.control("", [Validators.required, Validators.maxLength(20)]);
      this.description = this._fb.control("");

      this.formModel = this._fb.group({
        title: this.title,
        description: this.description,
      });

      const url = this.router.url.split("/");
      this.playlistId = url[url.length - 1];
  }

  ngOnInit(): void {

    this.title?.setValue(this.data.title);
    this.description?.setValue(this.data.description);

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
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

  onClose(playlistInfo: Playlist = null): void {
    this.dialogRef.close(playlistInfo);
  }

  onSubmit(): void {

    if (this.errors.length === 0) {
      const { title, description } = this.formModel.value;

      const playlistInfo = {
        id: this.playlistId, title, description
      };

      this.editPlaylist(playlistInfo);
    }
  }

   editPlaylist(playlistInfo: Playlist): void {
    const token = this.usersService.getFromLocStore("jwt-token");
    token && this.store.dispatch(AuthActions.editPlaylist({ playlistInfo, token }));

    this.store.select(selectIsEdited).pipe(
      takeUntil(this.destroy$),
    ).subscribe((isEdited) => {
      if (isEdited) {
        this.onClose(playlistInfo);
      }
    });
  }

}
