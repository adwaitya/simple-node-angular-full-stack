import { IReturnModel } from './i-return.model';
export class ReturnModel<T> implements IReturnModel {
    model: T;
    isSuccess: boolean;
    errorHolder: Error;
    message: string;
    httpCode: number;
}
