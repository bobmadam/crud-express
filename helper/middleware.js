const httpResp = require('./httpResp')

async function recordHit(req, res, next) {
  res.locals = {}
  res.locals.response = {}

  res.locals.status = httpResp.HTTP_NOTFOUND
  res.locals.response.rc = httpResp.HTTP_NOTFOUND
  res.locals.response.rd = ``
  res.locals.response.data = {}
  next()
}

function printForwardRequestResponse(req, res, next) {
  const { response, status } = res.locals
  res
    .set('Content-Type', 'application/json')
    .status(status || 200)
    .send(response)

  next()
}

module.exports = {
  recordHit,
  printForwardRequestResponse,
}
