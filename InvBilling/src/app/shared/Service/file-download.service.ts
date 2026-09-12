import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  /**
   * Saves a blob response to disk. Prefers the filename the API sent in
   * Content-Disposition and falls back to the caller's name when the header is
   * absent (or hidden by CORS).
   */
  saveResponse(response: HttpResponse<Blob>, fallbackFileName: string): void {
    const body = response.body;
    if (!body) {
      return;
    }
    this.saveBlob(body, this.readFileName(response) ?? fallbackFileName);
  }

  saveBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Revoked on the next tick so the click has started the download first.
    setTimeout(() => URL.revokeObjectURL(url));
  }

  private readFileName(response: HttpResponse<Blob>): string | null {
    const disposition = response.headers.get('Content-Disposition');
    if (!disposition) {
      return null;
    }
    // filename*=UTF-8''name.pdf takes precedence over plain filename="name.pdf".
    const encoded = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (encoded?.[1]) {
      return decodeURIComponent(encoded[1].trim());
    }
    const plain = /filename="?([^";]+)"?/i.exec(disposition);
    return plain?.[1]?.trim() ?? null;
  }
}
