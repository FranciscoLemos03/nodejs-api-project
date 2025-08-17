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
git clone https://github.com/FranciscoLemos03/nodejs-api-project.git
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
JWT_SECRET="b7f8e2c1-4a9d-4e6b-9f3a-2d7c8e5f1a0b"
```

### 4. Start PostgreSQL with Docker
```sh
docker-compose up -d
```

### 5. Run database migrations
```sh
npm run drizzle:migrate
```

### 6. (Optional) Seed the database
```sh
npm run db:seed
```
> If you get errors about missing columns, make sure your database schema matches your code. You may need to reset your database or manually add missing columns.

### 7. Start the API server
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

### User Login
`POST /sessions`
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

## API Documentation
- Swagger UI: [http://localhost:3333/docs](http://localhost:3333/docs) (development mode)

## Project Structure
```
├── src/
│   ├── database/
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   └── routes/
│       ├── create-course.ts
│       ├── get-courses-by-id.ts
│       ├── get-courses.ts
│       └── login.ts
├── drizzle.config.ts
├── drizzle/
│   ├── 0000_curvy_peter_parker.sql
│   ├── 0001_petite_forge.sql
│   ├── 0002_cynical_roland_deschain.sql
│   ├── 0003_dry_boom_boom.sql
│   ├── 0004_ancient_albert_cleary.sql
│   ├── 0005_melodic_vindicator.sql
│   └── meta/
│       ├── _journal.json
│       ├── 0000_snapshot.json
│       ├── 0001_snapshot.json
│       ├── 0002_snapshot.json
│       ├── 0003_snapshot.json
│       ├── 0004_snapshot.json
│       └── 0005_snapshot.json
├── docker-compose.yml
├── server.ts
├── .env
├── package.json
└── requisitions.http
```

## Testing Endpoints

You can use the `requisitions.http` file for example requests in VS Code REST Client extension:

```http
POST http://localhost:3333/courses
Content-Type: application/json
Authorization: <your-jwt-token>

{
    "title": "Curso de c#"
}
###

GET http://localhost:3333/courses?orderBy=title
###

GET http://localhost:3333/courses/<course-id>
Authorization: <your-jwt-token>
###

POST http://localhost:3333/sessions
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "123456"
}
```

## Common Issues & Solutions

- **Drizzle migration errors:**  
  If you see errors about missing columns (e.g., `"password"` in `"users"`), your database schema is out of sync.  
  - Reset your database:  
    ```sh
    docker-compose down -v
    docker-compose up -d
    npm run drizzle:migrate
    ```
  - Or manually add missing columns using SQL.

- **Seed script errors:**  
  Make sure all columns exist in your tables before running the seed script.

- **API connection errors in VS Code:**  
  Ensure your server is running (`npm run dev`) and Docker is up (`docker-compose up -d`).

- **ESM/CommonJS import errors:**  
  For CommonJS modules like `jsonwebtoken`, use:
  ```typescript
  import pkg from 'jsonwebtoken';
  const { sign } = pkg;
  ```

## Application Flow

Below is a Mermaid diagram showing the most important flow of the application:

```mermaid
flowchart TD
    A[Client Request] --> B{API Endpoint}
    B -->|POST /courses| C[Create Course]
    B -->|GET /courses| D[Get All Courses]
    B -->|GET /courses/:id| E[Get Course by ID]
    C --> F[Validate Input]
    F --> G[Insert into DB]
    G --> H[Return Course ID]
    D --> I[Fetch Courses]
    I --> J[Return Courses]
    E --> K[Fetch Course by ID]
    K --> L{Course Exists?}
    L -->|Yes| M[Return Course]
    L -->|No| N[404 Not Found]
```

**Diagram explanation:**
- The client sends requests to the API endpoints.
- Each endpoint validates input and interacts with the database.
- Responses are returned based on the result of the database operations.
