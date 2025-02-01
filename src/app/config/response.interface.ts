import {IRESTResponse} from "../service/rest";

export interface ISuccess {
  message: string
}

export type TSuccessResponse = IRESTResponse<ISuccess>
