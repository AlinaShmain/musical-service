import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaylistListComponent } from './user-playlist-list.component';

describe('UserPlaylistListComponent', () => {
  let component: UserPlaylistListComponent;
  let fixture: ComponentFixture<UserPlaylistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlaylistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
