export default async function (fastify, opts) {
    fastify.get('/',
        {
            schema: {
                response: {
                    // 200: { $ref: "contactosSchema" },
                    200: {
                        description: 'Ok. Return a Contact list.',
                        content: {
                            "application/json": {
                                "schema": {
                                    type: "object",
                                    "properties": {
                                        root: { type: "boolean" }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            handler: async function (request, reply) {
                return { root: true }
            }
        })

}