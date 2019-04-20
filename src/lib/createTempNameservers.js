const createTempNameservers = nameservers => {
  const tmpNameservers = {}
  for (let i = 0; i < 6; i++) {
    if (nameservers[i]) {
      tmpNameservers['nameserver' + (i + 1)] = nameservers[i]
    }
  }

  return tmpNameservers
}

module.exports = createTempNameservers
