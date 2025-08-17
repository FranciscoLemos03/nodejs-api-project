import { fastifySwagger } from '@fastify/swagger' // create doc
import scalarAPIReference from '@scalar/fastify-api-reference' // doc ui
import fastify from 'fastify' // create the server
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'// For validations
// Routes
import { createCourseRoute } from './routes/create-course.ts'
import { getCoursesByIdRoute } from './routes/get-courses-by-id.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import { loginRoute } from './routes/login.ts'

const server = fastify({
    logger: {
        transport:{
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODEENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Desafio Node.JS',
                version: '1.0.0',
            }
        },
        transform: jsonSchemaTransform,
    })

    server.register(scalarAPIReference, {
        routePrefix: '/docs',
        configuration:{
            theme: 'elysiajs'
        }
    })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCoursesByIdRoute)
server.register(getCoursesRoute)
server.register(loginRoute)

export { server }