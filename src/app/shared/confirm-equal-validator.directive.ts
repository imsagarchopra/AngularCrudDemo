import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector:'[appConfirmEqualValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: confirmEqualValidatorDirective,
        multi: true
    }]
})
export class confirmEqualValidatorDirective implements Validator{
    @Input() appConfirmEqualValidator!: string;

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const controlToCompare = control.parent?.get(this.appConfirmEqualValidator);

        if(controlToCompare && controlToCompare.value !== control.value){
            return{'notEqual': true};
        }
        return null;
    }
}