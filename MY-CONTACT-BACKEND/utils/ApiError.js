// export const ApiError = (status, message) => {
// }  function for handling error, Ugly syntax, No proper inheritance chain


// We use a class extending Error to create custom error types that preserve stack traces, support inheritance, and carry HTTP-specific metadata like status codes. This allows centralized and consistent error handling in Express applications
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;