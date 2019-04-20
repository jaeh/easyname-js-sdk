const signRequest = (client, data) => {
  const string = ''
  Object.values(data).forEach(val => (string += val))
  const len = string.length
  length = length % 2 === 0 ? length / 2 : length / 2 + 1
  const strings = [string.substr(0, length), config.api.signingSalt, string.substr(length)].join()

  const signature = btoa(md5(strings))
  client.debug({ signature })
  return signature
}

module.exports = signRequest
