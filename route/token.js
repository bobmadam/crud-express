/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

const httpResp = require('../helper/httpResp')
const redis = require('../database/redis')

const MAX_LIFE_TIME = 300 // 300 Second == 5 Minute
const REDIS_USER_TOKEN = `user:token:`

router.get('/', async (req, res, next) => {
  const { accessToken } = req.query

  const getDataRedis = await redis.get(`${REDIS_USER_TOKEN}${accessToken}`)
  if (!getDataRedis) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `User Not Found`
    return next()
  }

  const dataRedis = JSON.parse(getDataRedis)

  res.locals.status = httpResp.HTTP_OK
  res.locals.response.rc = httpResp.HTTP_OK
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = dataRedis

  next()
})

router.post('/set', async (req, res, next) => {
  const { idUser, phone } = req.body
  const genereateToken = uuidv4()

  await redis.setex(
    `${REDIS_USER_TOKEN}${genereateToken}`,
    MAX_LIFE_TIME,
    JSON.stringify({
      idUser,
      phone,
    })
  )

  res.locals.status = httpResp.HTTP_CREATED
  res.locals.response.rc = httpResp.HTTP_CREATED
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = {
    accessToken: genereateToken,
  }

  next()
})

router.put('/update', async (req, res, next) => {
  const { accessToken } = req.query
  const { idUser, phone } = req.body

  const getDataRedis = await redis.get(`${REDIS_USER_TOKEN}${accessToken}`)
  if (!getDataRedis) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `Token Not Found`
    return next()
  }

  const dataRedis = JSON.parse(getDataRedis)
  dataRedis.idUser = idUser !== undefined ? idUser : dataRedis.idUser
  dataRedis.phone = phone !== undefined ? phone : dataRedis.phone

  await redis.setex(`${REDIS_USER_TOKEN}${accessToken}`, MAX_LIFE_TIME, JSON.stringify(dataRedis))

  res.locals.status = httpResp.HTTP_ACCEPTED
  res.locals.response.rc = httpResp.HTTP_ACCEPTED
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = dataRedis

  next()
})

router.delete('/remove', async (req, res, next) => {
  const { accessToken } = req.query

  const getDataRedis = await redis.get(`${REDIS_USER_TOKEN}${accessToken}`)
  if (!getDataRedis) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `Token Not Found`
    return next()
  }

  await redis.unlink(`${REDIS_USER_TOKEN}${accessToken}`)

  res.locals.status = httpResp.HTTP_ACCEPTED
  res.locals.response.rc = httpResp.HTTP_ACCEPTED
  res.locals.response.rd = `SUCCESS`

  next()
})
module.exports = router
