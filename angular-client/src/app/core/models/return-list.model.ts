import { IReturnModel } from './i-return.model';
export class ReturnListModel<T> implements IReturnModel {
    model: T[];
    isSuccess: boolean;
    errorHolder: Error;
    message: string;
    httpCode: number;
}
