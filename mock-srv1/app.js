'use strict'

const path = require('path') // Asegúrate de importar el módulo 'path'
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')
const websocket = require('@fastify/websocket')

//const fastify = require('fastify')()

module.exports = async function (fastify, opts) {
  fastify.register(cors)
  fastify.register(websocket)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
