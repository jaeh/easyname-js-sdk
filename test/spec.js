const { is } = require('@magic/test')

const init = require('../src')
const sampleConfig = require('../config/sample.config.js')

const client = init(sampleConfig)

const noDebugConfig = { ...sampleConfig, debug: false }

const noop = () => {}

module.exports = [
  {
    fn: () => init(sampleConfig).config,
    expect: is.deep.equal(sampleConfig),
    info: 'client.config === sampleConfig',
  },
  { fn: () => init(sampleConfig).debug, expect: is.fn, info: 'client.debug is a function' },
  {
    fn: () => init(sampleConfig).debug,
    expect: fn => fn.toString() !== noop.toString(),
    info: 'client.debug is () => {} if debug === false',
  },
  {
    fn: () => init(noDebugConfig).debug,
    expect: fn => fn.toString() === noop.toString(),
    info: 'client.debug is not () => {} if debug === true',
  },
]
