### Script das Requisições em **cURL**

```bash
#!/bin/bash

# Iniciar estresse de CPU e memória (exemplo com CPU level 5, 200MB de memória, por 5 minutos)
curl -X POST http://localhost:3000/stress/start \
-H "Content-Type: application/json" \
-d '{
  "cpuLevel": 5,
  "memoryLevel": 200,
  "duration": 5
}'

# Parar o estresse de CPU e memória
curl -X POST http://localhost:3000/stress/stop \
-H "Content-Type: application/json" \
-d '{}'

# Verificar o status atual do estresse
curl -X GET http://localhost:3000/stress/status

# Adicionar um novo item no CRUD
curl -X POST http://localhost:3000/items \
-H "Content-Type: application/json" \
-d '{"name": "Novo Item"}'

# Listar todos os itens
curl -X GET http://localhost:3000/items

# Ver detalhes de um item (por ID)
curl -X GET http://localhost:3000/items/1

# Deletar um item pelo ID
curl -X DELETE http://localhost:3000/items/1
```

Esta documentação detalha as requisições HTTP que podem ser feitas para a API utilizando **cURL**.

## Requisições para o Teste de Estresse

### 1. Iniciar Estresse de CPU e Memória

Inicia um teste de estresse na aplicação, controlando separadamente o nível de estresse da CPU e a quantidade de memória alocada. O tempo de estresse também pode ser configurado.

#### Rota:
- **POST** `/stress/start`

#### Parâmetros:
- `cpuLevel`: Nível de estresse da CPU (valor numérico).
- `memoryLevel`: Quantidade de memória a ser alocada (em MB).
- `duration`: Duração do estresse em minutos (máximo 10 minutos).

#### Exemplo de cURL:
```bash
curl -X POST http://localhost:3000/stress/start \
-H "Content-Type: application/json" \
-d '{
  "cpuLevel": 5,
  "memoryLevel": 200,
  "duration": 5
}'
```

#### Resposta Esperada:
```json
{
  "message": "Estresse iniciado: CPU (5), Memória (200MB) por 5 minutos."
}
```

---

### 2. Parar o Estresse

Para o estresse de CPU e memória imediatamente.

#### Rota:
- **POST** `/stress/stop`

#### Exemplo de cURL:
```bash
curl -X POST http://localhost:3000/stress/stop \
-H "Content-Type: application/json" \
-d '{}'
```

#### Resposta Esperada:
```json
{
  "message": "Estresse de CPU e Memória parado."
}
```

---

### 3. Verificar Status do Estresse

Retorna o status atual do estresse, incluindo o nível de CPU e memória utilizados, além do tempo restante de estresse.

#### Rota:
- **GET** `/stress/status`

#### Exemplo de cURL:
```bash
curl -X GET http://localhost:3000/stress/status
```

#### Resposta Esperada:
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

---

## Requisições CRUD para Itens

### 1. Adicionar um Novo Item

Adiciona um novo item ao sistema de armazenamento em memória.

#### Rota:
- **POST** `/items`

#### Parâmetros:
- `name`: Nome do item a ser adicionado.

#### Exemplo de cURL:
```bash
curl -X POST http://localhost:3000/items \
-H "Content-Type: application/json" \
-d '{"name": "Novo Item"}'
```

#### Resposta Esperada:
```json
{
  "id": 1,
  "name": "Novo Item"
}
```

---

### 2. Listar Todos os Itens

Retorna todos os itens armazenados na memória.

#### Rota:
- **GET** `/items`

#### Exemplo de cURL:
```bash
curl -X GET http://localhost:3000/items
```

#### Resposta Esperada:
```json
[
  {
    "id": 1,
    "name": "Novo Item"
  }
]
```

---

### 3. Ver Detalhes de um Item

Retorna os detalhes de um item específico com base no `id`.

#### Rota:
- **GET** `/items/:id`

#### Parâmetros:
- `id`: ID do item a ser retornado.

#### Exemplo de cURL:
```bash
curl -X GET http://localhost:3000/items/1
```

#### Resposta Esperada:
```json
{
  "id": 1,
  "name": "Novo Item"
}
```

---

### 4. Deletar um Item

Remove um item específico com base no `id`.

#### Rota:
- **DELETE** `/items/:id`

#### Parâmetros:
- `id`: ID do item a ser removido.

#### Exemplo de cURL:
```bash
curl -X DELETE http://localhost:3000/items/1
```

#### Resposta Esperada:
```json
{
  "message": "Item com id 1 removido."
}
