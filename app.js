import path from 'path'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import sensible from "./plugins/sensible.js"
import swagger from "./plugins/swagger.js"
import schemas from "./plugins/schemas.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass --options via CLI arguments in command to enable these options.
export const options = {}

export default async function (fastify, opts) {

  //Fastify ecosystem plugins
  fastify.register(sensible)

  //MY CUSTOM PLUGINS
  fastify.register(swagger)
  fastify.register(schemas) //Registramos los schemas

  //MY DECORATORS, funciones o datos que se agregan a la instancia para ampliar la funcionalidad.
  // Agregar metadatos globales a la instancia de Fastify
  fastify.decorate('meta', {
    some: "metadata"
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true,
  })
}
