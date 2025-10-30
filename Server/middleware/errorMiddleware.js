
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // If the status code is 200, change it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = errorHandler;

