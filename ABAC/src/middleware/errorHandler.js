export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message
    });
};
