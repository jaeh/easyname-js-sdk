const { is, tryCatch } = require('@magic/test')
const { checkConfig } = require('../../src/lib')

const api = {
  key: 'test',
  authenticationSalt: 'test',
  signingSalt: 'test',
}

module.exports = [
  { fn: tryCatch(checkConfig), expect: is.error, info: 'checkConfig errors without args' },
  {
    fn: tryCatch(checkConfig),
    expect: e => e.message.includes('config is undefined'),
    info: 'checkConfig errors without args',
  },
  { fn: tryCatch(checkConfig, {}), expect: is.error, info: 'checkConfig without url errors' },
  {
    fn: tryCatch(checkConfig, {}),
    expect: e => e.message.includes('config.url is the wrong type'),
    info: 'checkConfig url error string is correct',
  },

  {
    fn: tryCatch(checkConfig, { url: '' }),
    expect: is.error,
    info: 'checkConfig without api errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '' }),
    expect: e => e.message.includes('config.api is undefined'),
    info: 'checkConfig config.api error string is correct',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: {} }),
    expect: is.error,
    info: 'checkConfig without config.api.key errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: {} }),
    expect: e => e.message.includes('config.api.key is the wrong type'),
    info: 'checkConfig api error string is correct',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: { key: 'test' } }),
    expect: is.error,
    info: 'checkConfig without config.api.authenticationSalt errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: { key: 'test' } }),
    expect: e => e.message.includes('config.api.authenticationSalt is the wrong type'),
    info: 'checkConfig config.api.authenticationSalt error string is correct',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: { key: 'test', authenticationSalt: 'test' } }),
    expect: is.error,
    info: 'checkConfig without config.api.signingSalt errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api: { key: 'test', authenticationSalt: 'test' } }),
    expect: e => e.message.includes('config.api.signingSalt is the wrong type'),
    info: 'checkConfig config.api.signingSalt error string is correct',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api }),
    expect: is.error,
    info: 'checkConfig without config.user errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api }),
    expect: e => e.message.includes('config.user is undefined'),
    info: 'checkConfig config.user error string is correct',
  },

  {
    fn: tryCatch(checkConfig, { url: '', api, user: {} }),
    expect: is.error,
    info: 'checkConfig without config.user.id errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api, user: {} }),
    expect: e => e.message.includes('config.user.id is the wrong type'),
    info: 'checkConfig config.user.id error string is correct',
  },

  {
    fn: tryCatch(checkConfig, { url: '', api, user: { id: 0 } }),
    expect: is.error,
    info: 'checkConfig without config.user.email errors',
  },
  {
    fn: tryCatch(checkConfig, { url: '', api, user: { id: 0 } }),
    expect: e => e.message.includes('config.user.email is the wrong type'),
    info: 'checkConfig config.user.email error string is correct',
  },

  {
    fn: checkConfig({ url: '', api, user: { id: 0, email: 'test' } }),
    expect: true,
    info: 'checkConfig returns true if minimal config requirements are met',
  },
]
