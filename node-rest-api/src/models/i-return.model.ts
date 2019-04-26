import { Response } from 'express-serve-static-core';

export interface  IReturnModel{
  httpCode: number;
  isSuccess: boolean;
}
