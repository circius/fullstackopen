const errorHandler = (error, _, res, next) => {
  const errorResponse = (res, statusCode, error) =>
    res.status(statusCode).json({ 'error': error })

  process.env.NODE_ENV !== 'test' ?
    console.error('error: ', error.message) :
    null

  if (error.name === 'ValidationError') {
    return errorResponse(res, 400, 'invalid input')
  }

  next(error)
}

module.exports = errorHandler
