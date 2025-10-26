import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageFileValidator(maxSizeMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    // ✅ No file selected → skip validation
    if (!file || file === '' || file === null || file === undefined) {
      return null;
    }

    // ✅ Support both File and FileList
    const selectedFile =
      file instanceof File ? file :
      file instanceof FileList && file.length > 0 ? file.item(0) :
      null;

    if (!selectedFile) {
      return null;
    }

    // ✅ Type check
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      return { invalidFileType: true };
    }

    // ✅ Size check
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      return { fileTooLarge: true };
    }

    return null;
  };
}
