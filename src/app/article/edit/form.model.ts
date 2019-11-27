import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ArticleFormControl extends FormControl {
  private label: string;
  private modelProperty: string;

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

export class ArticleFormGroup extends FormGroup {
  constructor() {
    super({
      title: new ArticleFormControl('Название', 'title', '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])),
      categoryId: new ArticleFormControl('Категория', 'categoryId', null,
        Validators.compose([
          Validators.required
        ])),
      text: new ArticleFormControl('Текст', 'text', '',
        Validators.compose([
          Validators.required,
          Validators.minLength(100)
        ]))
    });
  }

  get articleControls(): ArticleFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as ArticleFormControl);
  }

  getFormValidationMessages(form: any): string[] {
    const messages: string[] = [];
    this.articleControls.forEach(c => c.getValidationMessages()
      .forEach(m => messages.push(m)));
    return messages;
  }
}