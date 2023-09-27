import { contactos } from "../../basededatos/index.js";

export default async function (fastify, opts) {
    fastify.delete('/:id', {
        schema: {
            response: {
                200: {
                    description: 'Contacto eliminado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                },
                404: {
                    description: 'Contacto no encontrado',
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        },

        handler:
            async function (request, reply) {
                const id = request.params.id;
                if(id >= contactos.length)
                    return reply.status(404).send({error: "No existe el contacto"});
                contactos.splice(id, 1);
                return reply.status(200).send({message: "Contacto eliminado"});
            }
        });
}