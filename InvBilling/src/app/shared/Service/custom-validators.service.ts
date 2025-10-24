import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageFileValidator(maxSizeMB: number = 5): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    // No file selected → valid (because not required)
    if (!file) return null;

    // For multiple files (if input allows multiple)
    const f = file instanceof FileList ? file[0] : file;

    if (!(f instanceof File)) return null;

    // Check MIME type
    if (!f.type.startsWith('image/')) {
      return { invalidFileType: true };
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (f.size > maxSizeBytes) {
      return { fileTooLarge: true };
    }

    return null;
  };
}
