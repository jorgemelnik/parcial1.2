import fp from 'fastify-plugin'

export default fp(async (fastify) => {

  fastify.addSchema({
    $id: "response204Schema",
    "description": "No elements found",
    type: "null",
  });

  fastify.addSchema({
    $id: "response404Schema",
    description: 'Not found',
    type: 'object',
    properties: {
      statusCode: { type: "number" },
      error: { type: "string" },
      message: { type: 'string' }
    },
    required: ["statusCode", "error", "message"],
  });

  fastify.addSchema({
    $id: "response400Schema",
    description: 'Not found',
    type: 'object',
    properties: {
      statusCode: { type: "number" },
      code: { type: "string" },
      error: { type: "string" },
      message: { type: 'string' }
    },
    required: ["statusCode", "error", "message"],
  });

  fastify.addSchema({
    $id: "idParamSchema",
    description: "Id de la ruta",
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  });

  fastify.addSchema({
    $id: "contactoSchema",
    description: 'Contacto',
    type: 'object',
    properties: {
      id: { type: 'number' },
      foto: { type: 'string' },
      nombre: { type: 'string', minLength: 5 },
      sobrenombre: { type: 'string', minLength: 2, maxLength: 10 },
      edad: { type: 'number', minimum: 18 },
      email: { type: 'string', format: 'email' },
      telefono: { type: 'string', minLength: 3, maxLength: 20 }
    },
    required: ["id", "foto", "nombre", "sobrenombre", "edad", "email", "telefono"]
  });

  fastify.addSchema({
    $id: "contactoSinIdSchema",
    description: 'Contacto sin id',
    type: 'object',
    properties: {
      foto: { type: 'string' },
      nombre: { type: 'string', minLength: 5 },
      sobrenombre: { type: 'string', minLength: 2, maxLength: 10 },
      edad: { type: 'number', minimum: 18 },
      email: { type: 'string', format: 'email' },
      telefono: { type: 'string', minLength: 3, maxLength: 20 }
    },
    required: ["foto", "nombre", "sobrenombre", "edad", "email", "telefono"]
  });

  fastify.addSchema({
    $id: "contactosSchema",
    description: 'Contactos',
    type: 'array',
    items: { $ref: "contactoSchema" },
  });

})
