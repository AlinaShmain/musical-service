import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeletePlaylistModalComponent } from "../delete-playlist-modal/delete-playlist-modal.component";
import { EditPlaylistModalComponent } from "../edit-playlist-modal/edit-playlist-modal.component";
import { MediaData } from "../models/media-data";
import { Playlist } from "../models/playlist";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "ms-media-content",
  templateUrl: "./media-content.component.html",
  styleUrls: ["./media-content.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaContentComponent implements OnInit, OnDestroy {

  @Input() mediaData: MediaData;

  private dialogEdit: MatDialogRef<EditPlaylistModalComponent>;
  private dialogDelete: MatDialogRef<DeletePlaylistModalComponent>;
  private destroy$ = new Subject<void>();

  isOpenDropdown: boolean = false;
  playlistId: string;

  constructor(private usersService: UsersService, private dialog: MatDialog, private cdr: ChangeDetectorRef,
    private router: Router) {
    const url = this.router.url.split("/");
    this.playlistId = url[url.length - 1];
  }

  ngOnInit(): void {
    console.log("init media content component");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isUserPlaylist(playlistId: string): boolean {
    const playlistIds: string[] = this.usersService.getPlaylistIds();

    return playlistIds?.includes(playlistId);
  }

  isShow(): boolean {
    return this.usersService.isAuthenticated() && this.isUserPlaylist(this.playlistId);
  }

  onDropdown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  openEditModal(): void {
    const { header, description } = this.mediaData;

    this.dialogEdit = this.dialog.open(EditPlaylistModalComponent, {
      width: "400px",
      data: {
        title: header,
        description,
      }
    });

    this.dialogEdit.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((result: Playlist) => {
      if (result) {
        console.log("after dialog close", result);

        this.mediaData.header = result.title;
        this.mediaData.description = result.description;

        this.isOpenDropdown = false;
        this.cdr.markForCheck();
      }
    });
  }

  openDeleteModal(): void {
    this.dialogDelete = this.dialog.open(DeletePlaylistModalComponent, {
      width: "400px",
    });

    this.dialogDelete.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((isDeleted) => {
      console.log("after dialog close");

      if (isDeleted) {
        this.isOpenDropdown = false;
        this.cdr.markForCheck();

        this.router.navigateByUrl("/main/user-playlists");
      }
    });
  }

}
