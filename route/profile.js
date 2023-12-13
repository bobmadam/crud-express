/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()

const httpResp = require('../helper/httpResp')
const modelProfile = require('../model/profile')

router.get('/all', async (req, res, next) => {
  const { offset, limit } = req.query
  const getData = await modelProfile.getAllProfile(offset, limit)

  res.locals.status = httpResp.HTTP_OK
  res.locals.response.rc = httpResp.HTTP_OK
  res.locals.response.rd = `SUCCESS`
  res.locals.response.data = getData

  next()
})

router.get('/specific', async (req, res, next) => {
  const { idUser } = req.query
  res.locals.status = httpResp.HTTP_OK
  res.locals.response.rc = httpResp.HTTP_OK
  res.locals.response.rd = `SUCCESS`

  const getData = await modelProfile.getSpecificProfile(idUser)
  if (!getData.id_user) {
    res.locals.response.rd = 'SUCCESS, NOT FOUND'
  }

  res.locals.response.data = getData

  next()
})

router.post('/create', async (req, res, next) => {
  const { nameUser, phone, address } = req.body
  res.locals.status = httpResp.HTTP_CREATED
  res.locals.response.rc = httpResp.HTTP_CREATED
  res.locals.response.rd = `SUCCESS`

  const insertData = await modelProfile.insertProfile({
    nameUser,
    phone,
    address,
  })

  res.locals.response.data = insertData

  next()
})

router.put('/update', async (req, res, next) => {
  const { idUser, nameUser, phone, address } = req.body
  res.locals.status = httpResp.HTTP_ACCEPTED
  res.locals.response.rc = httpResp.HTTP_ACCEPTED
  res.locals.response.rd = `SUCCESS`

  const getData = await modelProfile.getSpecificProfile(idUser)
  if (!getData.id_user) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `User Not Found`
    return next()
  }

  const updateData = await modelProfile.updateProfile(idUser, {
    nameUser: nameUser !== undefined ? nameUser : getData.name_user,
    phone: phone !== undefined ? phone : getData.phone,
    address: address !== undefined ? address : getData.address,
  })

  res.locals.response.data = updateData

  next()
})

router.delete('/delete', async (req, res, next) => {
  const { idUser } = req.body
  res.locals.status = httpResp.HTTP_GENERALERROR
  res.locals.response.rc = httpResp.HTTP_GENERALERROR
  res.locals.response.rd = `ERROR`

  const getData = await modelProfile.getSpecificProfile(idUser)
  if (!getData.id_user) {
    res.locals.status = httpResp.HTTP_BADREQUEST
    res.locals.response.rc = httpResp.HTTP_BADREQUEST
    res.locals.response.rd = `User Not Found or Already Deleted`
    return next()
  }

  const deleteProfile = await modelProfile.deleteProfile(idUser)
  if (deleteProfile === 1) {
    res.locals.status = httpResp.HTTP_ACCEPTED
    res.locals.response.rc = httpResp.HTTP_ACCEPTED
    res.locals.response.rd = 'SUCCESS'
  }

  next()
})
module.exports = router
