export const SALT_ROUNDS = 10;

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const LOGOUT_ROUTE = '/logout';
export const SESSION_CHECK_ROUTE = '/session';
export const RANK_ROUND = '/rankRound';

export enum ErrorCode {
    NotFound = 'NOT_FOUND',
    InvalidInput = 'INVALID_INPUT',
    Unauthorized = 'UNAUTHORIZED',
    BadCredentials = 'BAD_CREDENTIALS',
    ErDupEntry = 'ER_DUP_ENTRY',
    Internal = 'INTERNAL',
  }

export const ERR_HANDLER_OBJECT = {
  [ErrorCode.NotFound]: { status: 404, message: 'Not found' },
  [ErrorCode.InvalidInput]: { status: 422, message: 'Invalid input' },
  [ErrorCode.Unauthorized]: { status: 401, message: 'Unauthorized' },
  [ErrorCode.BadCredentials]: { status: 401, message: 'Bad credentials' },
  [ErrorCode.ErDupEntry]: { status: 409, message: 'Duplicate entry' },
  [ErrorCode.Internal]: { status: 500, message: 'Internal server error' },
};
