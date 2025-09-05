import { Hono } from 'hono'
import { openAPIRouteHandler } from 'hono-openapi'

const app = new Hono()

app.get('/', (context) => context.json({ message: 'hello world' }))

app.get('/openapi.json', openAPIRouteHandler(app))

export default app
