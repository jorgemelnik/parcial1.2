import { contactos } from "../../basededatos/index.js"

export default async function (fastify, opts) {
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
            if(id >= contactos.length)
                return reply.status(404).send({message: "No existe el contacto"});
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