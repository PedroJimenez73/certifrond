import { FormGroup } from '@angular/forms';

export function ValidatePass(form: FormGroup) {
  if (form.get('password').value !== form.get('checkpass').value) {
    return {diferente: true};
  } else {
    return null;
  }
}