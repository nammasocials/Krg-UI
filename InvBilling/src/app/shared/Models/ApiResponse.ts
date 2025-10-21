export class ApiResponse<T> {
  code: number = 0;
  message: string = "";
  data!: T;
}