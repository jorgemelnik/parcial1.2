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

                if (0 >= index)
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
            },
        },
        handler: async function (request, reply) {
            const contacto = request.body;
            contacto.id = id++;
            contactos.push(contacto);
            return reply.status(201).send(contactos[id - 1]);
        }
    });

    fastify.put('/:id', {
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
            },
            body: {
                type: 'object',
                required: ['foto', 'nombre', 'sobrenombre', 'edad', 'email', 'telefono'],
                properties: {
                    foto: { type: 'string' },
                    nombre: { type: 'string', minLength: 5 },
                    sobrenombre: { type: 'string', minLength: 2, maxLength: 10 },
                    edad: { type: 'number', minimum: 18 },
                    email: { type: 'string', format: 'email' },
                    telefono: { type: 'string', minLength: 3, maxLength: 20 }
                }
            }
        },
        handler: async function (request, reply) {
            const id = request.params.id
            if (id >= contactos.length)
                return reply.status(404).send({ message: "No existe el contacto" });
            const datos = request.body
            contactos[id].nombre = datos.nombre;
            contactos[id].sobrenombre = datos.sobrenombre;
            contactos[id].edad = datos.edad;
            contactos[id].email = datos.email;
            contactos[id].telefono = datos.telefono;
            return reply.status(200).send(contactos[id]);
        }
    });


}
