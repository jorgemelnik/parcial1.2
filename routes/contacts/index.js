import { contactos } from "../../basededatos/index.js"
let id = 5;

export default async function (fastify, opts) {

    //GET ALL
    fastify.get('/', {
        schema: {
            summary: 'Get contacts list',
            tags: ['contacts'],
            response: {
                200: { description: "Contact list has elements.", $ref: "contactosSchema" },
                204: { description: "There are no contacts.", $ref: "response204Schema" },
            }
        },
        handler: async (request, reply) => {
            if (contactos.length === 0)
                return reply.status(204).send();
            return reply.send(contactos);
        },
    });

    //GET BY ID
    fastify.get('/:id', {
        schema: {
            summary: 'Get contact by id',
            tags: ['contacts'],
            params: { $ref: "idParamSchema" },
            response: {
                200: { description: "Contact found by id.", $ref: "contactoSchema" },
                404: { description: "Id not found.", $ref: "genericErrorSchema" },
                400: { description: "Bad Request.", $ref: "genericErrorSchema" },
            }
        },
        handler: async function (request, reply) {
            const id = parseInt(request.params.id);
            const contacto = contactos.find(contacto => contacto.id === id);
            if (!contacto)
                return reply.notFound();
            return reply.send(contacto);
        }
    });

    //DELETE by id
    fastify.delete('/:id', {
        schema: {
            summary: 'Delete contact by id',
            tags: ['contacts'],
            params: { $ref: "idParamSchema" },
            response: {
                204: { description: "Contact deleted by id.", $ref: "response204Schema" },
                404: { description: "Id not found.", $ref: "genericErrorSchema" },
            }
        },
        handler:
            async function (request, reply) {
                const id = parseInt(request.params.id);
                const index = contactos.findIndex(c => c.id == id);

                if (0 > index)
                    return reply.notFound("No existe el contacto.");
                contactos.splice(index, 1);
                return reply.status(204).send();
            }
    });



    fastify.post('/', {
        schema: {
            summary: 'Create new contact',
            tags: ['contacts'],
            body: { $ref: "contactoSinIdSchema" },
            response: {
                201: { description: "Contact created.", $ref: "contactoSchema" },
                400: { description: "Bad Request.", $ref: "genericErrorSchema" },
            },
        },
        handler: async function (request, reply) {
            const contacto = request.body;
            contacto.id = id++;
            contactos.push(contacto);
            return reply.status(201).send(contacto);
        }
    });

    fastify.put('/:id', {
        schema: {
            summary: 'Update contact by id',
            tags: ['contacts'],
            params: { $ref: "idParamSchema" },
            body: { $ref: "contactoSchema" },
            response: {
                200: { description: "Contact updated by id.", $ref: "contactoSchema" },
                404: { description: "Id not found.", $ref: "genericErrorSchema" },
                400: { description: "Bad Request.", $ref: "genericErrorSchema" },
            },

        },
        handler: async function (request, reply) {
            // =>
            const id = parseInt(request.params.id);
            const contactoRecibido = request.body
            if (id !== contactoRecibido.id)
                return reply.badRequest();

            const contactoAModificar = contactos.find(c => c.id === id);
            if (!contactoAModificar)
                return reply.notFound();

            contactoAModificar.nombre = contactoRecibido.nombre;
            contactoAModificar.sobrenombre = contactoRecibido.sobrenombre;
            contactoAModificar.edad = contactoRecibido.edad;
            contactoAModificar.email = contactoRecibido.email;
            contactoAModificar.telefono = contactoRecibido.telefono;
            return reply.send(contactoAModificar);
        }
    });
}
