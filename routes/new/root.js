import { contactos } from "../../basededatos/index.js"

let id = 0;

export default async function (fastify, opts) { 
    const createContactoSchema = {
        summary: 'Crear un contacto',
        response: {
            201: {
                description: 'Contacto creado',
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
    }

    fastify.post('/', {
        schema: createContactoSchema,
        handler: async function (request, reply) {
            const contacto = request.body;
            contacto.id = id++;
            contactos.push(contacto);
            return reply.status(201).send(contactos[id-1]);
        }
    });
}