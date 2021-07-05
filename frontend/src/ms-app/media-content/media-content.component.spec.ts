import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MediaContentComponent } from "./media-content.component";

describe("MediaContentComponent", () => {
  let component: MediaContentComponent;
  let fixture: ComponentFixture<MediaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
