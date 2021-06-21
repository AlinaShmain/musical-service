import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { AuthActions } from "src/ms-app/store/actions";
import { AppState, selectRegisterError } from "src/ms-app/store/state/app.state";
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

  private destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private store: Store<AppState>, private router: Router) {
    super();
    this.name = this._fb.control("", [Validators.required, Validators.pattern("^[А-Яа-яЁёA-Za-z]*$"), Validators.maxLength(20), Validators.minLength(3)]);
    this.email = this._fb.control("", [Validators.required, Validators.email, Validators.maxLength(20), Validators.minLength(3)]);
    this.password = this._fb.control("", [Validators.required, Validators.pattern(
      "^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[@$!%*?&])([a-zA-Zа-яА-Я0-9@$!%*?&]{8,})$"), Validators.minLength(8)]);

    this.formModel = this._fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    console.log("init sign up component");

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.errors = [];
      this.calculateErrors(this.formModel);
    });

    this.calculateErrors(this.formModel);
  }

  ngOnDestroy(): void {
    console.log("destroy sign up component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerNewUser(user: User): void {
    this.store.dispatch(AuthActions.registerUser({ user }));

    this.store.select(selectRegisterError).pipe(
      filter((value) => !!value),
      takeUntil(this.destroy$),
    ).subscribe((error) => {
      console.log("error", error);
      if (error) {
        // TODO handle error User already exists
        //     Object.keys(this.formModel.controls).forEach((prop) => {
        //       const formControl = this.formModel.get(prop);
        //       if (formControl) {
        //         formControl.setErrors({
        //           "isIncorrect": true,
        //         });
        //         // formControl.setValidators(this.isCorrectUserData);
        //         this.errors = [
        //           ...this.errors,
        //           {
        //             controlName: prop,
        //             errorName: "isIncorrect",
        //             errorValue: <ValidationErrors>error,
        //           },
        //         ];
        //         this.cdr.markForCheck();
        //       }
        //     });
      } else {
        // TODO redirect to authenticated page if register success
        console.log("register success");
        // this.router.navigateByUrl("/");
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
        name, email, password, favouriteTracks: []
      };
      console.log("on submit form", user);
      this.registerNewUser(user);
    }
  }

}
