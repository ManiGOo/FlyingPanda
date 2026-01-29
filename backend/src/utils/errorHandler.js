export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.name === 'ValidationError' ? 400 : 500;

    res.status(statusCode).json({
        error: err.name || 'Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went Wrong'
    });
};