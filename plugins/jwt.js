import fp from 'fastify-plugin'
import jwt from "@fastify/jwt"

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async (fastify) => {
    fastify.register(jwt, {
        secret: 'supersecret'
    })
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})
