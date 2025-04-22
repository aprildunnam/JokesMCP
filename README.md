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

## Prerequisites

- Copilot Studio trial / license
- Azure Subscription (with payment method added)
- Node installed (preferably with NVM)
- Have a GitHub account and be logged in

## Minimal Path To Awesome

There are two parts of deploying this MCP Server:

- Create a new GitHub repository based on the template
- Deploy the Azure Web App and configure it to grab the source from the GitHub repository

### Part 1: Create a new GitHub repository based on the template

1. Select `Use this template`
1. Select `Create a new repository

    ![](./assets/usetemplate.png)

1. Select the right `Owner` 
1. Give it a `Repository name`
1. Optionally you can give it a `Description`
1. Select `Public` (if you want to make the repository publicly available) or `Private` (if you want to keep it private - **RECOMMENDED**)
1. Select `Create repository`

    This will take a little while. After it's done, you will be directed to the newly created repository.

1. Select the green `Code` button
1. Select the `Codespaces` tab
1. Select the green `Create codespace on main` button
 
    ![](./assets/createcodespace.png)

    This will create a codespace and load it. This might take a little while.

TODO: finish the instructions

### Part 2: Deploy the Azure Web App and configure it to grab the source from the GitHub repository

TODO: write the instructions

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
