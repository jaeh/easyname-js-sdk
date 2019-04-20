const http = require('https')

const createAuthentication = require('./createAuthentication')
const signRequest = require('./signRequest')

const request = client => params =>
  new Promise((resolve, reject) => {
    const {
      type,
      resource,
      id = null,
      subResource = null,
      subId = null,
      data = null,
      perform = null,
      limit = null,
      offset = null,
      filter = null,
    } = params

    let { method } = params
    if (!method && type) {
      method = type
    }

    const uri = `/${resource}`
    if (id) {
      uri += `/${id}`
    }
    if (subResource) {
      uri += `/${subResource}`
    }
    if (subId) {
      uri += `/${subId}`
    }
    if (perform) {
      uri += `/${perform}`
    }

    const uriParameters = {}
    if (method === 'GET') {
      if (offset !== null) {
        uriParameters.offset = offset
      }
      if (limit !== null) {
        uriParameters.limit = limit
      }
      if (filter !== null) {
        if (Array.isArray(filter)) {
          uriParameters.filter = filter.join(',')
        } else {
          uriParameters.filter = filter
        }
      }
    }

    if (client.config.debug && client.config.xDebugKey) {
      uriParameters.XDEBUG_SESSION_START = client.config.xDebugKey
    }

    if (Object.keys(uriParameters).length) {
      uri += querystring.stringify(uriParameters)
    }

    const url = client.config.url ? client.config.url + uri : uri

    const options = {
      method,
      headers: {
        'X-User-ApiKey': client.config.api.key,
        'X-User-Authentication': createAuthentication(client),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Readable-JSON': client.config.debug ? 1 : 0,
      },
    }

    client.debug(`${method}: ${url}`)

    const req = http.request(url, options, res => {
      client.debug(`STATUS: ${res.statusCode}`)
      client.debug(`HEADERS: ${JSON.stringify(res.headers)}`)
      res.setEncoding('utf8')

      let body = ''
      res.on('data', chunk => {
        client.debug(`BODY: ${chunk}`)
        body += chunk
      })

      res.on('end', () => {
        client.debug('Response done:', { body })
        // if (typeof cb === 'function') {
        //   cb({ ...res, body: JSON.parse(body) })
        // }
        resolve({ ...res, body: JSON.parse(body) })
      })
      res.on('error', reject)
    })

    if (method === 'POST') {
      let postData = data
      // not a string nor a number
      if (typeof data !== 'string' && data !== +data) {
        postData = JSON.stringify(data)
      } else {
        postData = JSON.stringify(data)
      }
      postData.timestamp = Math.round(new Date().getTime() / 1000)
      postData.signature = signRequest(client, postData)
      req.write(postData)
    }

    req.end()

    return req
  })

module.exports = request
