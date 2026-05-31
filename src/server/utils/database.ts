import dns from 'node:dns'
import { createError } from 'h3'
import mongoose from 'mongoose'

let connectionPromise: Promise<typeof mongoose> | null = null
let dnsConfigured = false

const configureMongoDns = (servers: unknown) => {
  if (dnsConfigured || typeof servers !== 'string' || !servers.trim()) {
    return
  }

  dns.setServers(
    servers
      .split(',')
      .map((server) => server.trim())
      .filter(Boolean),
  )

  dnsConfigured = true
}

export const connectToDatabase = async () => {
  const config = useRuntimeConfig()
  configureMongoDns(config.mongodbDnsServers)

  if (!config.mongodbUri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MONGODB_URI is not configured.',
    })
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(config.mongodbUri, {
        dbName: config.mongodbDatabase,
      })
      .catch((error) => {
        connectionPromise = null
        throw error
      })
  }

  return await connectionPromise
}
