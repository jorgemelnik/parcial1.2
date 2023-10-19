import { findAll,findOneById,deleteById, create,updateById } from "../../servicios/contactos.js"

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
            const contactos = findAll();
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
            const contacto = findOneById(id);
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
                try {
                    deleteById(id);
                }
                catch(e){
                    return reply.notFound(e.message);
                }
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
            const contactoCreado = create(request.body);
            return reply.status(201).send(contactoCreado);
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
            try {
                const contactoModificado = updateById(id,contactoRecibido);
                return reply.send(contactoModificado);
            }catch(e){
                return reply.notFound(e.message);
            }
            
            
        }
    });
}
