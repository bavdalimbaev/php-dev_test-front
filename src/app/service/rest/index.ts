export interface IRESTResponse<T> {
  status: number,
  success: boolean,
  data: T
}
