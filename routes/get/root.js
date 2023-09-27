import { contactos } from "../../basededatos/index.js"

export default async function (fastify, opts) {
    fastify.get('/', {
        schema: {
            response: {
                200: {
                    description: 'Contactos',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            foto: { type: 'string' },
                            nombre: { type: 'string' },
                            sobrenombre: { type: 'string' },
                            edad: { type: 'number' },
                            email: { type: 'string' },
                            telefono: { type: 'string' }
                        }
                    }
                }
            }
        },
        handler: async function (request, reply) {
            if(contactos.length == 0)
                return reply.status(204).send({"message": "No hay contactos"});
            return reply.send(contactos);
        },
    });

    fastify.get('/:id', {
        schema: {
            response: {
                200: {
                    description: 'Contacto',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        foto: { type: 'string' },
                        nombre: { type: 'string' },
                        sobrenombre: { type: 'string' },
                        edad: { type: 'number' },
                        email: { type: 'string' },
                        telefono: { type: 'string' }
                    }
                },
                404: {
                    description: 'Contacto no encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }

            }
        },
        handler: async function (request, reply) {
            const id = request.params.id;
            if(id >= contactos.length)
                return reply.status(404).send({message: "No existe el contacto"});
            return reply.status(200).send(contactos[id]);
        }
    }
    );
}
