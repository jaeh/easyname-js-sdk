const md5 = require('crypto-js').MD5

const createAuthentication = client => {
  const { api, user } = client.config
  const md5String = md5(`${api.authenticationSalt}${user.id}${user.email}`)
  const auth = Buffer.from(md5String).toString('base64')
  client.debug({ auth })

  return auth
}

module.exports = createAuthentication
