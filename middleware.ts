// middleware should be in the root of the next.js project
import { NextResponse } from 'next/server'

export const middleware = (req: Request) => {
  return NextResponse.redirect(new URL('/', req.url))
}

export default middleware

// need config to match the route
// this stops any request to /todos and redirects to /
export const config = {
  matcher: ['/resellers/:id/:name/:email/:rest'],
}
