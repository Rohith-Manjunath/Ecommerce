module.exports = (e, req, res, next) => {
  e.message = e.message || "Internal server error";
  e.statusCode = e.statusCode || 500;
  res.status(e.statusCode).json({
    success: false,
    err: e.message,
  });
};
