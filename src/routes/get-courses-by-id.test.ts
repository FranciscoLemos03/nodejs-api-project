import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'

test('Get course by id with success', async () => {

    await server.ready()

    const { token } = await makeAuthenticatedUser('student')
    const course = await makeCourse()

    const response = await request(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        }
    })
})

test('Get course by id returning 404', async () => {

    await server.ready()
    
    const { token } = await makeAuthenticatedUser('student')

    const response = await request(server.server)
        .get(`/courses/7d413967-81bb-4809-84e0-a04e2315060a`)
        .set('Authorization', token)

    expect(response.status).toEqual(404)
})