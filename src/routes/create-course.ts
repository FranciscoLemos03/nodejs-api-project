import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { checkRequestJWT } from './hooks/check-request-jwt.ts'
import { checkUserRole } from './hooks/check-user-role.ts'

export const createCourseRoute: FastifyPluginAsyncZod  = async (server) => {
    server.post('/courses', {
        preHandler: [
            checkRequestJWT,
            checkUserRole('manager'),
        ],
        schema: {
            tags: ['courses'],
            summary: 'Create a course',
            description: 'This route have title as param and create a course in postgres',
            body: z.object({
                title: z.string().min(5, 'Min. 5 characters'),
            }),
            response: {
                201: z.object({ courseId: z.uuid() }).describe('Course created successfully!')
            }
        }
    }, async (request, reply) => {    
        
        const courseTitle = request.body.title

        const result = await db
            .insert(courses)
            .values({ title: courseTitle, })
            .returning()

        return reply.status(201).send({courseId: result[0].id})
    })
}