const expectedConfig = {
  url: 'string',
  api: {
    key: 'string',
    authenticationSalt: 'string',
    signingSalt: 'string',
  },
  user: {
    id: 'number',
    email: 'string',
  },
}

const checkConfig = (config, parent = false) => {
  let configName = 'config'
  if (parent) {
    configName += `.${parent}`
  }

  if (!config) {
    throw new Error(`${configName} is undefined`)
  }

  let expected = expectedConfig
  if (parent) {
    expected = expected[parent]
  }

  Object.entries(expected).forEach(([key, value]) => {
    const errorName = `${configName}.${key}`

    if (typeof value !== 'string') {
      checkConfig(config[key], key)
    } else {
      if (typeof config[key] !== value) {
        throw new Error(
          `${errorName} is the wrong type, expected ${value}, got ${typeof config[key]}`,
        )
      }
    }

    if (typeof config[key] === 'undefined') {
      error = ' is not set'
      throw new Error(`${errorName} is undefined`)
    }
  })

  return true
}

module.exports = checkConfig
