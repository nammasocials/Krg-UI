import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageFileValidator(maxSizeMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    // if no file selected, don't validate
    if (!file) {
      return null;
    }

    // If control value is not a File (Angular may store it differently), handle it
    const selectedFile = file instanceof File ? file : file instanceof FileList ? file[0] : null;
    if (!selectedFile) {
      return null;
    }

    // check file type
    if (!selectedFile.type.startsWith('image/')) {
      return { invalidFileType: true }; // ✅ This key must match your template
    }

    // check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      return { fileTooLarge: true }; // ✅ This one too
    }

    return null; // ✅ valid file
  };
}
