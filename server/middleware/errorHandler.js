module.exports = function (err, req, res, next) {
    const status = err.status || 500;
    const errors = err.message || `Internal server error`;
    res.status(status).json({
        message: errors
    });
}