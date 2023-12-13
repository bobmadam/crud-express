/* eslint-disable import/no-extraneous-dependencies */
const Redis = require('async-redis')
const config = require('../config/config')

// Redis configuration
const options = config.get('REDIS')

let redisClient = null

// Create a Redis client
async function getConnection() {
  if (!redisClient) {
    redisClient = await Redis.createClient(options)
  }
  return redisClient
}

// Get
async function get(lines) {
  const client = await getConnection()
  const redisResult = await client.get(lines)
  return redisResult
}

// Create/Update with Expired
async function setex(lines, timeExpire, data) {
  const client = await getConnection()
  await client.setex(lines, timeExpire, data)
}

// Delete
async function unlink(lines) {
  const client = await getConnection()
  await client.unlink(lines)
}

function close() {
  return new Promise((resolve, reject) => {
    try {
      if (redisClient) {
        redisClient.quit(() => {
          console.log('Redis client closed.')
          resolve({ result: 'Close Redis Success' })
        })
      } else {
        resolve({ result: 'There is no connection Redis' })
      }
    } catch (e) {
      console.error(e)
      reject(new Error('Close Redis Failed'))
    }
  })
}

module.exports = {
  get,
  setex,
  unlink,
  close,
}
