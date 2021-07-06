import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { AuthActions } from "src/ms-app/store/actions";
import { AppState, selectAuthenticated, selectRegisterError } from "src/ms-app/store/state/app.state";
import { AuthModalComponent } from "../auth-modal.component";
import { ValidationErrorsComponent } from "../validation-errors/validation-errors.component";
@Component({
  selector: "ms-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent extends ValidationErrorsComponent implements OnInit, OnDestroy {

  name: FormControl;
  email: FormControl;
  password: FormControl;

  formModel: FormGroup;

  submitted: boolean = false;
  isShown: boolean = false;

  authenticated: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private store: Store<AppState>, private router: Router, private dialogRef: MatDialogRef<AuthModalComponent>) {
    super();
    this.name = this.fb.control("", [Validators.required, Validators.pattern("^[А-Яа-яЁёA-Za-z]*$"), Validators.maxLength(20), Validators.minLength(3)]);
    this.email = this.fb.control("", [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(3)]);
    this.password = this.fb.control("", [Validators.required, Validators.pattern(
      "^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[@$!%*?&])([a-zA-Zа-яА-Я0-9@$!%*?&]{8,})$"), Validators.minLength(8)]);

    this.formModel = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {

    this.store.select(selectAuthenticated).pipe(
      takeUntil(this.destroy$),
    ).subscribe((authenticated) => {
      this.authenticated = authenticated;
    });

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.submitted && this.resetErrorMessages(this.formModel);
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

  onFocus(): void {
    if (this.submitted) {
      this.password.setValue("");
      this.submitted = !this.submitted;
    }
  }

  registerNewUser(user: User): void {
    this.store.dispatch(AuthActions.registerUser({ user }));

    this.store.select(selectAuthenticated).pipe(
      takeUntil(this.destroy$),
    ).subscribe((authenticated) => {
      if (authenticated) {
        this.onClose();
      }
    });

    this.store.select(selectRegisterError).pipe(
      filter((value) => !!value),
      takeUntil(this.destroy$),
    ).subscribe((error) => {
      if (error) {
        // TODO handle error User already exists
      }
    });
  }

  onShow(): void {
    this.isShown = !this.isShown;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.errors.length === 0) {
      const { name, email, password } = this.formModel.value;

      const user = {
        name, email, password, favouriteTracks: [], playlistIds: [],
      };
      this.registerNewUser(user);
    }
  }

  onClose(): void {
    this.router.navigate(
      [
        {
          outlets: {
            popupContent: null,
          },
        },
      ]);
    this.dialogRef.close();
  }

}
