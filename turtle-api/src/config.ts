export const SALT_ROUNDS = 10;


export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const LOGOUT_ROUTE = '/logout';


export const ERR_HANDLER_OBJECT = {
    ER_DUP_ENTRY: {
        status: 409,
        message: 'Email already taked',
    },
    ZodError: {
        status: 400,
        message: 'Validation error',
    },
};
