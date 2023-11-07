import { findAll, findOneById, deleteById, create, updateById } from "../../servicios/contactos.js"

export async function findAllHandler(request, reply) {
    const contactos = findAll();
    if (contactos.length === 0) {
        reply.status(204);
        return reply.send();
    }
    return reply.send(contactos);
}

export default async function (fastify, opts) {

    fastify.get('/user', {
        schema: {
            summary: 'Get user data',
            tags: ['auth'],
            response: {
                200: { description: "Login OK.", $ref: "userSchema" },
                401: { description: "Unauthorized.", $ref: "genericErrorSchema" },
            },

        },
        onRequest: [fastify.authenticate],
        handler: (request, reply) => {
            return reply.send(request.user)
        }
    })

    fastify.post('/login', {
        schema: {
            summary: 'Login to get token',
            tags: ['auth'],
            body: { $ref: "loginSchema" },
            response: {
                200: { description: "Login OK.", $ref: "tokenSchema" },
                401: { description: "Unauthorized.", $ref: "genericErrorSchema" },
                400: { description: "Bad Request.", $ref: "genericErrorSchema" },
            },

        },
        handler: (request, reply) => {
            const { body } = request;
            console.log({ body });
            if (body.password != "lapassword") {
                reply.unauthorized();
            }
            const token = fastify.jwt.sign({
                id: 999,
                email: body.email,
            },)
            return reply.send({ token })
        }
    })
}
