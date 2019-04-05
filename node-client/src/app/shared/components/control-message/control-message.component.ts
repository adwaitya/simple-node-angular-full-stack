import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss']
})
export class ControlMessageComponent  {
  @Input()
  public control: FormControl;
  @Input()
  public labelName?: string;

  constructor() { }

  get errorMessage(): boolean {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidationErrorMessage(
          propertyName,
          this.control.errors[propertyName],
          this.labelName,
        );
      }
    }

    return undefined;
  }

}
