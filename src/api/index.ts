import lineHandler from './line'
import { EResponseStatus, responseFormatHttp } from '../http'

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url)

    if (pathname === '/') return await lineHandler(req)

    return responseFormatHttp(EResponseStatus.SUCCESS, {})
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)

export default server
