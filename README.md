# Node.js API Project

A RESTful API built with Fastify, TypeScript, Drizzle ORM, and PostgreSQL. This project provides endpoints to create and retrieve courses, with OpenAPI documentation and a modern Swagger UI.

## Features
- Fastify server with Zod validation
- PostgreSQL database integration via Drizzle ORM
- Endpoints to create and fetch courses
- OpenAPI documentation with Swagger and Scalar UI
- Dockerized PostgreSQL setup

## Prerequisites
- Node.js 18+
- Docker (for running PostgreSQL)

## Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd nodejs-api-project
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Edit `.env` if needed:
```
NODEENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio"
```

### 4. Start PostgreSQL with Docker
```sh
docker-compose up -d
```

### 5. Run database migrations
```sh
npm run drizzle:migrate
```

### 6. Start the API server
```sh
npm run dev
```

The server will run on `http://localhost:3333`.

## API Endpoints

### Create a Course
`POST /courses`
```json
{
  "title": "Curso de React"
}
```

### Get All Courses
`GET /courses`

### Get Course by ID
`GET /courses/:id`

## API Documentation
- Swagger UI: [http://localhost:3333/docs](http://localhost:3333/docs) (development mode)

## Project Structure
```
├── src/
│   ├── database/
│   │   ├── client.ts
│   │   └── schema.ts
│   └── routes/
│       ├── create-course.ts
│       ├── get-courses-by-id.ts
│       └── get-courses.ts
├── drizzle.config.ts
├── docker-compose.yml
├── server.ts
├── .env
└── package.json
```

## Testing Endpoints
See `requisitions.http` for example requests.

## Application Flow (Mermaid Diagram)

```mermaid
flowchart TD
    A[Client Request] --> B{API Endpoint}
    B -->|POST /courses| C[Create Course]
    B -->|GET /courses| D[Get All Courses]
    B -->|GET /courses/:id| E[Get Course by ID]
    C --> F[Validate Input]
    D --> G[Fetch Courses]
    E --> H[Fetch Course by ID]
    F --> I[Insert into DB]
    G --> J[Return Courses]
    H --> K{Course Exists?}
    I --> L[Return Course ID]
    K -->|Yes| M[Return Course]
    K -->|No| N[404 Not Found]
```

This diagram illustrates the main flow:
- The client sends requests to the API endpoints.
- Each endpoint validates input and interacts with the database.
- Responses are returned based on the result of the database operations.

## License
MIT
