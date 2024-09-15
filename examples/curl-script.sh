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
