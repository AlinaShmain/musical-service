import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { AllValidationControlErrors } from "src/ms-app/models/all-validation-control-errors";

@Component({
  selector: "ms-validation-errors",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorsComponent {

  protected  errors: AllValidationControlErrors[] = [];

  constructor() {
    console.log("auth form", this.errors.length);
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
          // if (error.controlName === "email") {
          //   return `Field ${error.controlName} has incorrect data`;
          // }
          return "";
        case "maxlength":
          return `Length of field ${error.controlName} should be ${error.errorValue.requiredLength} characters maximum`;
        case "minlength":
          return `Length of field ${error.controlName} should be ${error.errorValue.requiredLength} characters minimum`;
        case "isIncorrect":
          return "Incorrect email or password";
        case "email":
          return `Field ${error.controlName} has incorrect data format`;
        default:
          return `Unknown error in validation of ${error.errorName} field`;
      }
    } else {
      return "";
    }
  }

}
