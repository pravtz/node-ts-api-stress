# Node.js API com TypeScript - Teste de Estresse (CPU e Memória)

## Commands
```bash
docker build -t node-ts-api .
docker run -p 3000:3000 node-ts-api

```




---

# Node.js API com TypeScript - Teste de Estresse (CPU e Memória)

Este projeto é uma API simples criada com **Node.js** e **TypeScript**. A API oferece funcionalidades básicas de CRUD com armazenamento em memória e, além disso, implementa testes de estresse controlados separadamente para **CPU** e **memória**.

## Funcionalidades

- **CRUD** de itens em memória.
- Geração de estresse de CPU.
- Geração de estresse de memória.
- Controle individual sobre o nível de estresse de CPU e memória.
- Status do estresse aplicado.

## Requisitos

- Node.js (>= 14.x)
- Docker (opcional, caso queira rodar via container)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/pravtz/node-ts-api-stress.git
cd node-ts-api-stress
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo de desenvolvimento:

```bash
npm run dev
```

4. Para compilar e rodar o código em modo de produção:

```bash
npm run build
npm start
```

## Rotas da API

A API roda por padrão na porta `3000`. As seguintes rotas estão disponíveis:

### CRUD de Itens

- **GET** `/items`: Retorna todos os itens em memória.
- **GET** `/items/:id`: Retorna o item específico com base no `id`.
- **POST** `/items`: Adiciona um novo item (corpo da requisição: `{ "name": "Nome do item" }`).
- **DELETE** `/items/:id`: Remove o item com base no `id`.

### Teste de Estresse

- **POST** `/stress/start`: Inicia o estresse de CPU e/ou memória por um tempo definido.
  - Corpo da requisição (JSON):
    ```json
    {
      "cpuLevel": 5,
      "memoryLevel": 100,
      "duration": 5
    }
    ```
    - `cpuLevel`: Nível de estresse de CPU (valor numérico).
    - `memoryLevel`: Quantidade de memória a ser alocada (em MB).
    - `duration`: Tempo de estresse em minutos (máximo de 10 minutos). Se não for informado, será utilizado o valor padrão de 10 minutos.

- **POST** `/stress/stop`: Para o estresse de CPU e memória imediatamente.

- **GET** `/stress/status`: Retorna o status atual do estresse, incluindo:
  - Se o estresse de CPU está ativo.
  - Nível de CPU configurado.
  - Se o estresse de memória está ativo.
  - Nível de memória alocada (em MB).
  - Tempo restante de estresse (em segundos).

## Executando com Docker

Se preferir rodar via Docker:

1. Construa a imagem:

```bash
docker build -t node-ts-api-stress .
```

2. Execute o container:

```bash
docker run -p 3000:3000 node-ts-api-stress
```

Agora a API estará disponível em `http://localhost:3000`.

## Exemplos de Uso

### 1. Iniciar Estresse de CPU e Memória

Envie uma requisição `POST` para `http://localhost:3000/stress/start` com o seguinte corpo:

```json
{
  "cpuLevel": 5,
  "memoryLevel": 200,
  "duration": 5
}
```

- Isso iniciará estresse de **CPU** no nível 5 e alocará **200MB** de memória por **5 minutos**.
- O tempo máximo de estresse permitido é **10 minutos**. Se o valor de `duration` for maior que 10, ele será ajustado para 10 minutos.

### 2. Parar o Estresse

Envie uma requisição `POST` para `http://localhost:3000/stress/stop`:

```json
{}
```

Isso irá parar o estresse de CPU e liberar a memória aloc

ada.

### 3. Verificar o Status

Envie uma requisição `GET` para `http://localhost:3000/stress/status` para ver o status atual do estresse:

Resposta esperada:

```json
{
  "isCpuStressed": true,
  "stressCpuLevel": 5,
  "isMemoryStressed": true,
  "stressMemoryLevel": 200,
  "allocatedMemorySize": 200,
  "stressDuration": 300
}
```

