const logger = require('./looger.js')

const requestLogger = (req, res, next) => {
  console.log('requestLogger running:')
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  // console.log('error handler running: error',error)
  //logger.error('error name',error.name)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError' || error.name ==='SyntaxError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }
  logger.error(error.message)
  next(error)
}



const unknownEndpoint = (req, res) => {
  console.log('unknown end pint running:')
  res.status(404).send({ error: 'unknown endpoint' })
}



module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint
}