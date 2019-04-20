const client = require('./src')
const config = require('./config/sample.config')

const api = client(config)

/*
 * Domain
 */

const callback = (err, res) => (err ? console.log(err) : console.log(res))
// let request = api.listDomains(callback)

// request = api.getDomain(1, callback)

// request = api.createDomain({
//   domain: "example.com",
//   registrantContact: 23,
//   adminContact: 23,
//   techContact: 23,
//   zoneContact: 23,
//   trustee: false,
// }, callback)

// request = api.transferDomain({
//   domain: "example.com",
//   registrantContact: 23,
//   adminContact: 23,
//   techContact: 23,
//   zoneContact: 23,
//   trustee: false,
//   transferAuthcode: 'aaaaaa'
// }, callback)

// request = api.changeOwnerOfDomain({ id: 1, registrantContact: 23 }, callback)

// request = api.changeContactOfDomain({
//   id: 1,
//   adminContact: 23,
//   techContact: 23
//   zoneContact: 23,
// }, callback)

// request = api.changeNameserverOfDomain({
//   id: 1,
//   nameservers: ['ns1.example.com', 'ns2.example.com'],
// }, callback)

// request = api.expireDomain(1, callback)
// request = api.unexpireDomain(1, callback)
// request = api.deleteDomain(1, callback)
// request = api.restoreDomain(1, callback)

/*
 * Contact
 */

// request = api.listContact(callback)
// request = api.getContact(1, callback)
// request = api.createContact('person', 'John Doe (person)', 'John Doe', 'Street 12/34', '1234', 'Vienna', 'AT', '+4312345678', 'me@example.com', array('birthday' => '1970-01-31'))
// request = api.updateContact(1, 'John Doe (person)', 'Other Street 56/7', '1234', 'Vienna', '+4312345678', 'me@example.com', array('birthplaceCity' => 'Vienna'))
// request = api.deleteContact(1, callback)

// const run = async () => {
//   const result = await request
//   console.log('response returned: ', result.body)
// }

// run()
