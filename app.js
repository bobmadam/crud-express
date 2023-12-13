/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const bodyParser = require('body-parser')

// Helper
const postgresql = require('./database/postgresql')
const redis = require('./database/redis')
const config = require('./config/config')
const middleware = require('./helper/middleware')
const profileRoute = require('./route/profile')
const tokenRoute = require('./route/token')

// Initiate Server
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/check/health', (req, res) => res.send('OK'))
app.use('/profile', middleware.recordHit, profileRoute, middleware.printForwardRequestResponse) // PostgreSQL Implementation
app.use('/token', middleware.recordHit, tokenRoute, middleware.printForwardRequestResponse) // Redis Implementation

const port = config.get('PORT') || 3001

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

async function shutdown() {
  try {
    // Close Express server
    await new Promise((resolve) => server.close(resolve))

    // Close PostgreSQL pool
    await postgresql.close()

    // Close Redis Connection
    await redis.close()

    process.exit(0) // Exit the process
  } catch (error) {
    console.error('Error during shutdown:', error.message)
    process.exit(1) // Exit the process with an error code
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server and shutdown resources.')
  shutdown()
})
