import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CategoryFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    const messages: string[] = [];
    if (this.errors) {
      Object.keys(this.errors).map(key => {
        switch (key) {
          case 'required':
            messages.push(`Введите ${this.label}`);
            break;
          case 'minlength':
            messages.push(`${this.label} должно быть не менее ${this.errors.minlength.requiredLength} символов`);
            break;
        }
      });
    }
    return messages;
  }
}

export class CategoryFormGroup extends FormGroup {
  constructor() {
    super({
      name: new CategoryFormControl("Название", "name", "", 
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]))
    });
  }

  get categoryControls(): CategoryFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as CategoryFormControl);
  }

  getFormValidationMessages(form:any) : string[] {
    let messages: string[] = [];
    this.categoryControls.forEach(c => c.getValidationMessages()
      .forEach(m => messages.push(m)));
    return messages;
  }
}