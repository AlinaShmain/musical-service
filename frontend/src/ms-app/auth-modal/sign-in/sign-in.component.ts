import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { AuthActions } from "src/ms-app/store/actions";
import { AppState, selectAuthenticated, selectLoginError } from "src/ms-app/store/state/app.state";
import { AuthModalComponent } from "../auth-modal.component";
import { ValidationErrorsComponent } from "../validation-errors/validation-errors.component";
@Component({
  selector: "ms-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends ValidationErrorsComponent implements OnInit, OnDestroy {

  email: FormControl;
  password: FormControl;

  formModel: FormGroup;

  submitted: boolean = false;
  checked: boolean = false;
  isShown: boolean = false;

  authenticated: boolean = false;

  private destroy$ = new Subject<void>();
  subscribe: Subscription;

  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef, private store: Store<AppState>, private router: Router,
    private dialogRef: MatDialogRef<AuthModalComponent>) {
    super();

    this.email = this._fb.control("", [Validators.required, Validators.email, Validators.maxLength(20), Validators.minLength(3)]);
    this.password = this._fb.control("", [Validators.required, Validators.pattern(
      "^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[@$!%*?&])([a-zA-Zа-яА-Я0-9@$!%*?&]{8,})$"), Validators.minLength(8)]);

    this.formModel = this._fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    console.log("init sign in component");

    this.store.select(selectAuthenticated).pipe(
      takeUntil(this.destroy$),
    ).subscribe((authenticated) => {
      this.authenticated = authenticated;
      // this.cdr.markForCheck();
    });

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log("value change");
      this.submitted && this.resetErrorMessages(this.formModel);
      this.errors = [];
      this.calculateErrors(this.formModel);
      this.cdr.markForCheck();
    });

    this.calculateErrors(this.formModel);
  }

  ngOnDestroy(): void {
    console.log("destroy sign in component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFocus(): void {
    if (this.submitted) {
      console.log("on focus");
      this.password.setValue("");
      this.submitted = !this.submitted;
    }
  }

  handleCheckboxChange(): void {
    this.checked = !this.checked;
  }

  loginUser(user: User): void {
    this.store.dispatch(AuthActions.loginUser({ user }));

    this.store.select(selectAuthenticated).pipe(
      takeUntil(this.destroy$),
    ).subscribe((authenticated) => {
      if (authenticated) {
        this.onClose();
      }
    });

    this.store.select(selectLoginError).pipe(
      filter((value) => !!value),
      takeUntil(this.destroy$),
    ).subscribe((error) => {
      console.log("error", error);
      if (error) {
        Object.keys(this.formModel.controls).forEach((prop) => {
          const formControl = this.formModel.get(prop);
          if (formControl) {
            formControl.setErrors({
              "isIncorrect": true,
            });
            // formControl.setValidators(this.isCorrectUserData);
            this.errors = [
              ...this.errors,
              {
                controlName: prop,
                errorName: "isIncorrect",
                errorValue: <ValidationErrors>error,
              },
            ];
            this.cdr.markForCheck();
          }
        });
      }
    });
  }

  isCorrectUserData(): ValidationErrors | null {
    return this.authenticated ? { "isIncorrect": true } : null;
  }

  onShow(): void {
    this.isShown = !this.isShown;
  }

  onSubmit(): void {
    console.log("submit");
    this.submitted = true;

    if (this.errors.length === 0) {
      const { email, password } = this.formModel.value;

      const user = {
        email, password, favouriteTracks: [], playlistIds: [],
      };
      console.log("on submit form", user);
      this.loginUser(user);
    }
  }

  onClose(): void {
    this.router.navigate(
      [
        // ".",
        {
          outlets: {
            popupContent: null,
          },
        },
      ]);
    // this._modalService.setModalClose();
    this.dialogRef.close();
    // ).then(() => this.router.navigate(["/"]));
  }

}
