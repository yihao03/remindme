export interface StatusMessage {
  content: string;
  type: StatusMessageType;
}

export enum StatusMessageType {
  ERROR = 1,
  WARNING = 2,
  INFORMATION = 3,
  SUCCESS = 4,
}

export enum ErrorCode {
  AuthenticationError = "APP100",
  AuthorisationError = "APP101",
  TwoFAAuthorisationError = "2FA100",
  TwoFAAlreadyExistsError = "2FA101",
  InvalidOTPError = "2FA102",
  ExpiredOTPError = "2FA103",
  DefaultError = "",
}
/**
 * Describes the shape of the JSON response from API endpoints.
 */
export interface ApiResponse<D, M = unknown> {
  code: null | number;
  payload: { meta: M; data: D };
  messages: StatusMessage[];
}

export type ApiPromise<D, M = unknown> = Promise<ApiResponse<D, M>>;
