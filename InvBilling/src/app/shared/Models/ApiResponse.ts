export class ApiResponse<T> {
  code: number = 0;
  message: string = "";
  data!: T;
}

export class ApiErrorResponse {
  message: string = "";
  errors: { [key: string]: string[] } = {};

  constructor(init?: Partial<ApiErrorResponse>) {
    Object.assign(this, init);
  }
}
``
