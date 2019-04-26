import { IReturnModel } from './i-return.model';
export class ReturnListModel<T> {
  model: T[];
  errorHolder: Error;
  pageSize:number;
  pageNumber:number;
}
