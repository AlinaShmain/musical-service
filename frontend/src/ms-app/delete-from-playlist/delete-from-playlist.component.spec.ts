import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFromPlaylistComponent } from './delete-from-playlist.component';

describe('DeleteFromPlaylistComponent', () => {
  let component: DeleteFromPlaylistComponent;
  let fixture: ComponentFixture<DeleteFromPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFromPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFromPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
