import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface AllValidationControlErrors {
  controlName: string;
  errorName: string;
  errorValue: ValidationErrors;
}
@Component({
  selector: "ms-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {

  name: FormControl;
  password: FormControl;

  formModel: FormGroup;

  errors: AllValidationControlErrors[] = [];

  submitted: boolean = false;
  checked: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder) {
    this.name = this._fb.control("", [Validators.required, Validators.pattern("^[А-Яа-яЁёA-Za-z]*$"), Validators.maxLength(20), Validators.minLength(3)]);
    this.password = this._fb.control("", [Validators.required, Validators.pattern(
      "^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[@$!%*?&])([a-zA-Zа-яА-Я0-9@$!%*?&]{8,})$"), Validators.minLength(8)]);

    this.formModel = this._fb.group({
      name: this.name,
      password: this.password,
    });
  }

  ngOnInit(): void {
    console.log("init sign in component");

    this.formModel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.errors = [];
      this.calculateErrors(this.formModel);
    });

    this.calculateErrors(this.formModel);
  }

  ngOnDestroy(): void {
    console.log("destroy sign in component");
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculateErrors(form: FormGroup): AllValidationControlErrors[] {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        const controlErrors: ValidationErrors | null = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((keyError) => {
            this.errors.push({
              controlName: field,
              errorName: keyError,
              errorValue: controlErrors[keyError]
            });
          });
        }
      }
    });

    this.errors = this.errors.filter((error, index, self) => self.findIndex((t) => {
      return t.controlName === error.controlName && t.errorName === error.errorName;
    }) === index);
    return this.errors;
  }

  getErrorsControl(control: string): AllValidationControlErrors[] | undefined {
    return this.errors.filter((error) => error.controlName === control);
  }

  getErrorMessage(error: AllValidationControlErrors | undefined): string {
    if (error) {
      switch (error.errorName) {
        case "required":
          return `Field ${error.controlName} should not be empty`;
        case "pattern":
          if (error.controlName === "password") {
            return `Field ${error.controlName} should contain at least one lowercase, one uppercase, one number and one special character, no whitespaces`;
          }
          if (error.controlName === "name") {
            return `Field ${error.controlName} should contain only letters`;
          }
          if (error.controlName === "email") {
            return `Field ${error.controlName} has incorrect data`;
          }
          return "";
        case "maxlength":
          return `Length of field ${error.controlName} should be ${error.errorValue.requiredLength} characters maximum`;
        case "minlength":
          return `Length of field ${error.controlName} should be ${error.errorValue.requiredLength} characters minimum`;
        default:
          return `Unknown error in validation of ${error.errorName} field`;
      }
    } else {
      return "";
    }
  }

  handleCheckboxChange(): void {
    this.checked = !this.checked;
  }

  onSubmit(): void {
    console.log("submit");
    this.submitted = true;
  }

}
