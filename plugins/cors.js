import fp from 'fastify-plugin'
import cors from "@fastify/cors"

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: [
      "jmelnik.ddns.net",
      "http://localhost:4000",
      "http://localhost:4200"
    ],
  })
})
