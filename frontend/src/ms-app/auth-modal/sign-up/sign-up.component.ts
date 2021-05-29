import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { User } from "src/ms-app/models/user";
import { UsersService } from "src/ms-app/services/users/users.service";
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

  constructor(private _fb: FormBuilder, private usersService: UsersService) {
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
    this.usersService.registerUser(user).pipe(takeUntil(this.destroy$)).subscribe((data) => console.log(data));
    // this.goBack();
  }

  onShow(): void {
    this.isShown = !this.isShown;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.errors.length === 0) {
      const { name, email, password } = this.formModel.value;

      const user = {
        name, email, password
      };
      console.log("on submit form", user);
      this.registerNewUser(user);
    }
  }

}
