import { ValidationErrors } from "@angular/forms";

export interface AllValidationControlErrors {
    controlName: string;
    errorName: string;
    errorValue: ValidationErrors;
}
