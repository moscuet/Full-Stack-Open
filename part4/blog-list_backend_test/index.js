
const http = require('http')
const app = require('./app') // the actual Express application
const logger = require('./utils/looger')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`)
})