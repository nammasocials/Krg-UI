import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;

  async loadConfig(): Promise<void> {
    const response = await fetch('/assets/config.json');
    this.config = await response.json();
  }

  get apiBaseUrl(): string {
    const env = this.config?.ApiEnv || 'Default';
    return this.config?.apiDomainUrls?.[env] || '';
  }
}

