# Node TS API Stress

This is a Node.js API for stress testing.

## Usage


### Run the Docker container:

   ```sh
   docker run -p 3000:3000 pravtz/node-ts-api-stress

   ```

Veja um exemplo de como usar a API com [cURL](https://github.com/pravtz/node-ts-api-stress/blob/main/examples/example-use-curl.md).

## Funcionalidades

- **GET /items**: Retorna todos os itens.
- **GET /items/:id**: Retorna um item específico pelo ID.
- **POST /items**: Cria um novo item.
- **DELETE /items/:id**: Remove um item pelo ID.
- **POST /stress/start**: Inicia o estresse de CPU e/ou memória com parâmetros especificados.
- **POST /stress/stop**: Para o estresse de CPU e memória.
- **GET /stress/status**: Retorna o status atual do estresse.
