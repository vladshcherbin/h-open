import { Hono } from 'hono'
import { describeRoute, openAPIRouteHandler, resolver } from 'hono-openapi'
import { array, metadata, number, object, pipe, string, type InferOutput } from 'valibot'

const userSchema = pipe(
  object({
    id: number(),
    name: string()
  }),
  metadata({
    ref: 'User'
  })
)

const app = new Hono()

app.get('/', (context) => context.json({ message: 'hello world' }))

app.get('/users',
  describeRoute({
    tags: ['Users'],
    responses: {
      200: {
        description: 'All users',
        content: {
          'application/json': {
            schema: resolver(array(userSchema))
          }
        }
      }
    }
  }), 
  (context) => context.json([])
)

app.get('/user',
  describeRoute({
    tags: ['Users'],
    responses: {
      200: {
        description: 'Single user',
        content: {
          'application/json': {
            schema: resolver(userSchema)
          }
        }
      }
    }
  }), 
  (context) => context.json({
    id: 1,
    name: 'Sam'
  })
)

app.get('/openapi.json', openAPIRouteHandler(app))

export default app
