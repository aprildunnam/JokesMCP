# Jokes MCP Server (TypeScript SDK)

Welcome to the Jokes MCP Server! This is a [MCP](https://modelcontextprotocol.io/introduction) server built on the [TypeScript SDK](https://github.com/modelcontextprotocol/csharp-sdk).

With this MCP Server, you will able to fetch jokes from the following websites:
- [chucknorris.io](https://api.chucknorris.io/)
- [icanhazdadjoke.com](https://icanhazdadjoke.com/)

<table>
  <tr>
    <td><a href="https://api.chucknorris.io/"><img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" style="height:225px;width:450px;" alt="ChuckNorris.IO" /></a></td>
    <td><a href="https://icanhazdadjoke.com/"><img src="https://icanhazdadjoke.com/static/smile.svg" style="height:300px;width:300px;" alt="icanhazdadjoke.com" /></a></td>
  </tr>
</table>

## Tools

The following tools are included:

### get-chuck-joke

This tool retrieves a random Chuck Norris Joke from [chucknorris.io](https://api.chucknorris.io/).

### get-chuck-categories

This tool retrieves the available categories from [chucknorris.io](https://api.chucknorris.io/).

### get-dad-joke

This tool retrieves a random Dad Joke from [icanhazdadjoke.com](https://icanhazdadjoke.com/).

## Swagger Spec

```yml
swagger: '2.0'
info:
  title: Jokes MCP Server TS
  description: Get jokes using MCP SSE server
  version: '1.0'
host: jokes-mcp-dummyurl.azurewebsites.net
basePath: /
schemes:
  - https
definitions:
  QueryResponse:
    type: object
    properties:
      jsonrpc:
        type: string
      id:
        type: string
      method:
        type: string
      params:
        type: object
      result:
        type: object
      error:
        type: object
paths:
  /sse:
    get:
      summary: Jokes MCP Server TS
      parameters:
        - in: query
          name: sessionId
          type: string
          required: false
      produces:
        - application/json
      responses:
        '200':
          description: Immediate Response
          schema:
            $ref: '#/definitions/QueryResponse'
        '201':
          description: Created and will follow callback
      operationId: JokesMCPTS
      tags:
        - Agentic
        - McpSse
securityDefinitions: {}
security: []
```
