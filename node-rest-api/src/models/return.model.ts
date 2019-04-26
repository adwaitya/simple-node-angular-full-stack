import { IReturnModel } from './i-return.model';

export class ReturnModel<T> implements IReturnModel {
  model: T;
  isSuccess: boolean;
  message: string;
  errorHolder: Error;
  httpCode: number;
}
