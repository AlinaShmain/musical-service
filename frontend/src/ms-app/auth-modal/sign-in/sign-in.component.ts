import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { User } from "src/ms-app/model/user";
import { UsersService } from "src/ms-app/services/users.service";
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

  private destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private usersService: UsersService, private cdr: ChangeDetectorRef) {
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

  resetErrorMessages(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        // control.clearValidators();
        control.setErrors(null);
      }
    });
  }

  handleCheckboxChange(): void {
    this.checked = !this.checked;
  }

  loginUser(user: User): void {
    this.usersService.loginUser(user).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        console.log("authentification ended", result);
        // this.goBack();
      },
      error: (error: Error) => {
        // console.error(error);
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
      },
    });
  }

  isCorrectUserData(): ValidationErrors | null {
    return this.usersService.authenticated ? { "isIncorrect": true } : null;
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
        email, password
      };
      console.log("on submit form", user);
      this.loginUser(user);
    }
  }

}
