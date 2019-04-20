const { checkConfig, request, createTempNameservers } = require('./lib')

const client = {}

const init = config => {
  checkConfig(config)

  client.config = config

  if (config.debug === true) {
    client.debug = (...msg) => console.log(...msg)
  } else {
    client.debug = () => {}
  }

  client.request = request(client)

  return client
}

/**
 * DOMAIN
 */

/**
 * Fetch information about a single domain.
 * @param int id
 * @return object
 */
client.getDomain = id => client.request({ type: 'GET', resource: 'domain', id })

/**
 * List all active domains.
 */
client.listDomains = params => {
  const { limit = null, offset = null, filter = null } = params

  return client.request({
    type: 'GET',
    resource: 'domain',
    limit,
    offset,
    filter,
  })
}

client.listDomain = client.listDomains

/**
 * Register a new domain name.
 *
 * @param object params
 * @param string domain
 * @param int registrantContact
 * @param int adminContact
 * @param int techContact
 * @param int zoneContact
 * @param array nameservers
 * @param bool trustee
 * @return object
 */
client.createDomain = params =>
  client.request({
    method: 'POST',
    resource: 'domain',
    data: {
      ...params,
      trustee: params.trustee ? 1 : 0,
      transferIn: 0,
      ...createTempNameservers(nameservers),
    },
  })

/**
 * Transfer an existing domain name.
 *
 * @param object params
 * @param string domain
 * @param int registrantContact
 * @param int adminContact
 * @param int techContact
 * @param int zoneContact
 * @param array nameservers
 * @param bool trustee
 * @param null transferAuthcode
 * @return object
 */
client.transferDomain = params =>
  client.request({
    method: 'POST',
    resource: 'domain',
    data: {
      ...params,
      trustee: params.trustee ? 1 : 0,
      transferIn: 1,
      transferAuthcode: params.transferAuthCode || undefined,
      ...createTempNameservers(params.nameservers),
    },
  })

/**
 * Delete a specific domain instantly.
 *
 * @param int id
 * @return object
 */
client.deleteDomain = id =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    perform: 'delete',
  })

/**
 * Re-purchase a previously deleted domain.
 *
 * @param int id
 * @return object
 */
client.restoreDomain = id =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    perform: 'restore',
  })

/**
 * Set an active domain to be deleted on expiration.
 *
 * @param int id
 * @return object
 */
client.expireDomain = id =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    perform: 'expire',
  })

/**
 * Undo a previously commited expire command.
 *
 * @param int id
 * @return object
 */
client.unexpireDomain = id =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    perform: 'unexpire',
  })

/**
 * Change the owner of an active domain.
 *
 * @param int id
 * @param int registrantContact
 * @return object
 */
client.changeOwnerOfDomain = ({ id, registrantContact }) =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    data: {
      registrantContact,
    },
    perform: 'ownerchange',
  })

/**
 * Change additional contacts of an active domain.
 *
 * @param int id
 * @param int adminContact
 * @param int techContact
 * @param int zoneContact
 * @return object
 */
client.changeContactOfDomain = ({ id, adminContact, techContact, zoneContact }) =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    data: {
      adminContact,
      techContact,
      zoneContact,
    },
    perform: 'contactChange',
  })

/**
 * Change the nameserver settings of a domain.
 *
 * @param int id
 * @param array nameservers
 * @return object
 */
client.changeNameserverOfDomain = ({ id, nameservers }) =>
  client.request({
    method: 'POST',
    resource: 'domain',
    id,
    data: createTempNameservers(nameservers),
    perform: 'nameserverchange',
  })

/**
 * CONTACT
 */

/**
 * Fetch information about a contact.
 *
 * @param int id
 * @return object
 */
client.getContact = id =>
  client.request({
    method: 'GET',
    resource: 'contact',
    id,
  })

/**
 * List all contacts.
 *
 * @param int|null limit
 * @param int|null offset
 * @param null|int|array filter
 * @return object
 */
client.listContact = ({ limit = null, offset = null, filter = null }) =>
  client.request({
    limit,
    offset,
    filter,
    method: 'GET',
    resource: 'contact',
  })

/**
 * Create a contact.
 *
 * @param string type
 * @param string alias
 * @param string name
 * @param string address
 * @param string zip
 * @param string city
 * @param string country
 * @param string phone
 * @param string email
 * @param array|null additionalData
 * @return object
 */
client.createContact = params => {
  const { additionalData = {}, ...opts } = params

  return client.request({
    method: 'POST',
    resource: 'contact',
    data: {
      ...opts,
      ...additionalData,
    },
  })
}

/**
 * Modify a specific contact.
 *
 * @param id
 * @param alias
 * @param address
 * @param zip
 * @param city
 * @param phone
 * @param email
 * @param object additionalData
 * @return object
 */
client.updateContact = params => {
  const { id, additionalData = {}, ...data } = params
  return client.request({
    method: 'POST',
    resource: 'contact',
    id: params.id,
    data: {
      ...data,
      ...additionalData,
    },
  })
}

/**
 * Delete the specified contact
 *
 * @param int id
 * @return object
 */
client.deleteContact = id =>
  client.request({
    method: 'DELETE',
    resource: 'contact',
    id,
  })

/**
 * @return object
 */
client.getUserBalance = () =>
  client.request({
    method: 'GET',
    resource: 'user',
    id: client.config.user.id,
    perform: 'balance',
  })

module.exports = init
