import { StatusCodes } from "http-status-codes";

export default class ApiResponseModel<T> implements IApiResponse<T> {
  result?: T;
  error?: ServerError;

  constructor(res: T, err?: ServerError) {
    this.result = res;
    this.error = err;  
  }

  getResultOrDefault(defaultValue: T): T {
    return this.result !== undefined ? this.result : defaultValue;
  }
}

export interface IValidationFailure {
  property: string;
  error: string;
}

export interface IValidationErrorWithSeverity extends IValidationFailure {
  severity: string;
}

export class ProblemDetails {
  type?: string;
  response?: string;

  constructor(
    public title?: React.ReactNode,
    public detail?: React.ReactNode,
    public instance?: string,
    public status?: number,
    public errors?:
      | Record<string, string[]>
      | Array<IValidationFailure>
      | Array<IValidationErrorWithSeverity>
      | any,
  ) {}
}

export class ServerError {
  status?: number;
  statusText?: string;

  constructor(public data: ProblemDetails, statusCode?: number) {
    this.status = statusCode;
  }
}

export class ConnectStatusCodes {
  public static readonly badRequest = StatusCodes.BAD_REQUEST;
  public static readonly unAuthorized = StatusCodes.UNAUTHORIZED;
  public static readonly notFound = StatusCodes.NOT_FOUND;
  public static readonly preconditionFailed = StatusCodes.PRECONDITION_FAILED;
  public static readonly internalServerError = StatusCodes.INTERNAL_SERVER_ERROR;
  public static readonly paymentRequired = StatusCodes.PAYMENT_REQUIRED;
  public static readonly forbidden = StatusCodes.FORBIDDEN;

  public static isErrorStatus = (status: number): boolean => {
    return (
      status === ConnectStatusCodes.badRequest ||
      status === ConnectStatusCodes.unAuthorized ||
      status === ConnectStatusCodes.notFound ||
      status === ConnectStatusCodes.preconditionFailed ||
      status === ConnectStatusCodes.internalServerError ||
      status === ConnectStatusCodes.paymentRequired ||
      status === ConnectStatusCodes.forbidden
    );
  };
}

export interface IApiErrorResponse {
  error?: ServerError;
}

export interface IApiResponse<T> extends IApiErrorResponse {
  result?: T;
  getResultOrDefault(defaultValue: T): T;
}
