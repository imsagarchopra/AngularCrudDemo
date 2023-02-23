import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector:'[appSelectValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]
})
export class SelectRequiredValidatorDirective implements Validator
{
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return control.value === '-1' ? {'defaultSelected': true} : null;
    }
}