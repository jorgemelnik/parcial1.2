import { contactos } from "../../basededatos/index.js"
let id = 5;

export default async function (fastify, opts) {

    //GET ALL
    fastify.get('/', {
        schema: {
            response: {
                200: { $ref: "contactosSchema" },
                204: { $ref: "response204Schema" },
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
            params: { $ref: "idParamSchema" },
            response: {
                200: { $ref: "contactoSchema" },   //Aca también se puede agregar el application/json
                404: { $ref: "response404Schema" },
                400: { $ref: "response400Schema" }
            }
        },
        handler: async function (request, reply) {
            const id = parseInt(request.params.id);
            const contacto = contactos.find(contacto => contacto.id === id);
            if (!contacto)
                reply.notFound("Contacto no encontrado.");
            return reply.send(contacto);
        }
    });

    //DELETE by id
    fastify.delete('/:id', {
        schema: {
            params: { $ref: "idParamSchema" },
            response: {
                204: { $ref: "response204Schema" },
                404: { $ref: "response404Schema" },
                400: { $ref: "response400Schema" }
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
            summary: 'Crear un contacto',
            body: { $ref: "contactoSinIdSchema" },
            response: {
                201: { $ref: "contactoSchema" },
                400: { $ref: "response400Schema" }
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
            params: { $ref: "idParamSchema" },
            body: { $ref: "contactoSchema" },
            response: {
                200: { $ref: "contactoSchema" },
                404: { $ref: "response404Schema" },
                400: { $ref: "response400Schema" }
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
