# Facilita Jurídico - Sistema de Gerenciamento de Clientes

Este projeto foi desenvolvido como parte de um desafio técnico para a empresa Facilita Jurídico. Ele consiste em um
sistema de gerenciamento de clientes com funcionalidades básicas, como listar e cadastrar clientes. Além disso, foi
implementada uma otimização de rotas para maximizar a eficiência na visitação dos clientes.

## Objetivo do Desafio

O objetivo deste teste é avaliar as habilidades em programação, utilizando tecnologias como React, Node.js e PostgreSQL
para criar uma solução eficiente para o gerenciamento de clientes.

## Estrutura do Projeto

- **backend**: API construída em Node.js com Express e PostgreSQL.
- **frontend**: Aplicação desenvolvida em React.
- **docs**: Contém o DDL do banco de dados e testes de rotas realizados no Insomnia.

## Documentação das Rotas

A documentação detalhada das rotas da API está disponível no diretório `docs`. Esta documentação foi criada usando o Insomnia e inclui exemplos de requisições, respostas e autenticação.

Para acessar a documentação:

1. [Baixe e instale o Insomnia](https://insomnia.rest/download) se ainda não tiver instalado.
2. Abra o Insomnia.
3. Importe a documentação do diretório `docs` no seu projeto.

A documentação fornece informações sobre todas as rotas disponíveis, parâmetros necessários, autenticação requerida e exemplos práticos de como usar cada rota.

## Tecnologias Utilizadas

- Bootstrap v5.3
- Express v4.18.2
- Node.js v20.10.0
- PostgreSQL v16.1
- React v18.2.0
- Yarn v1.22.21

## Requisitos

- Node
- Yarn ou Npm

## Como Executar o Projeto

1. Clone este
   repositório: `git clone https://github.com/viniciusvasconcelosferreira/facilita-juridico-client-management-challenge.git`

### Backend

2. Navegue até o diretório do backend: `cd backend`
3. Crie um arquivo `.env` baseado no `.env.example` e ajuste conforme necessário:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://{user}:{password}@{host}:{port}/{database}
```

4. Instale as dependências: `npm install` ou `yarn install`
5. Execute o backend:
   - Modo de produção: `npm start` ou `yarn start`
   - Modo de desenvolvimento: `npm run dev` ou `yarn dev`

6. (Opcional) Se desejar popular o banco de dados com dados de exemplo, execute o comando de seed:

```bash
npm run seed
# ou
yarn seed
```

### Frontend

7. Navegue até o diretório do frontend: `cd frontend`
8. Crie um arquivo `.env` baseado no `.env.example` e ajuste conforme necessário:

```env
REACT_APP_DEV=true
REACT_APP_ENV=dev
REACT_APP_API_URL=http://localhost:5000/api/v1/
```

9. Instale as dependências: `npm install` ou `yarn install`
10. Execute o frontend: `npm start` ou `yarn start`

Certifique-se de ter um ambiente de desenvolvimento configurado com Node.js e as ferramentas necessárias para rodar o
projeto.

### Rotas da API

#### Listar Todos os Clientes

```http
GET http://localhost:3001/api/v1/clients
```

**Saída:**

```json
[
   {
      "id": 63,
      "name": "Isaac Silva Santos",
      "email": "Isabel75@yahoo.com",
      "telephone": "7393829710",
      "created_at": "2024-01-25T05:23:59.467Z",
      "updated_at": "2024-01-25T08:18:52.552Z",
      "x_coordinate": -9.3628,
      "y_coordinate": 32.4804
   },
   {
      "id": 55,
      "name": "Paulo Costa Filho",
      "email": "Liz4@live.com",
      "telephone": "98845618501",
      "created_at": "2024-01-25T05:23:59.446Z",
      "updated_at": "2024-01-25T05:23:59.446Z",
      "x_coordinate": -7.8551,
      "y_coordinate": 79.5369
   }
   // ...
]
```

#### Adicionar um Novo Cliente

```http
POST http://localhost:3001/api/v1/clients
```

**Entrada:**

```json
{
   "name": "Teste",
   "email": "teste2@mail.com",
   "telephone": "61999260211",
   "x_coordinate": 150,
   "y_coordinate": -84
}
```

**Saída:**

```json
{
   "message": "Cliente adicionado com sucesso.",
   "data": {
      "id": 66,
      "name": "Teste",
      "email": "teste2@mail.com",
      "telephone": "61999260211",
      "created_at": "2024-01-25T08:56:29.525Z",
      "updated_at": "2024-01-25T08:56:29.525Z",
      "x_coordinate": 150,
      "y_coordinate": -84
   }
}
```

#### Obter um Cliente por ID

```http
GET http://localhost:3001/api/v1/clients/66
```

**Saída:**

```json
{
   "message": "Cliente encontrado com sucesso",
   "data": {
      "id": 66,
      "name": "Teste",
      "email": "teste2@mail.com",
      "telephone": "61999260211",
      "created_at": "2024-01-25T08:56:29.525Z",
      "updated_at": "2024-01-25T08:56:29.525Z",
      "x_coordinate": 150,
      "y_coordinate": -84
   }
}
```

#### Atualizar um Cliente por ID

```http
PUT http://localhost:3001/api/v1/clients/53
```

**Entrada:**

```json
{
   "x_coordinate": 32,
   "y_coordinate": -23
}
```

**Saída:**

```json
{
   "message": "Cliente atualizado com sucesso.",
   "data": {
      "id": 53,
      "name": "Teste",
      "email": "teste2@gmail.com",
      "telephone": "61999260211",
      "created_at": "2024-01-25T05:15:33.945Z",
      "updated_at": "2024-01-25T05:23:21.075Z",
      "x_coordinate": 32,
      "y_coordinate": -23
   }
}
```

#### Excluir um Cliente por ID

```http
DELETE http://localhost:3001/api/v1/clients/47
```

**Saída:**

```json
{
   "message": "Cliente excluído com sucesso"
}
```

#### Buscar Clientes por Nome, Email ou Telefone

```http
GET http://localhost:3001/api/v1/clients/search?q=teste2
```

**Saída:**

```json
[
   {
      "id": 5,
      "name": "Teste",
      "email": "teste2@gmail.com",
      "telephone": "61999260211",
      "created_at": "2024-01-25T00:36:55.255Z",
      "updated_at": "2024-01-25T00:36:55.255Z"
   }
]
```

#### Excluir Todos os Clientes

```http
DELETE http://localhost:3001/api/v1/clients
```

**Saída:**

```json
{
   "message": "Todos os clientes foram excluídos com sucesso"
}
```

#### Calcular a Rota Mais Curta

```http
GET http://localhost:3001/api/v1/clients/short-route
```

**Saída:**

```json
{
   "data": [
      {
         "id": 58,
         "name": "Kléber Barros",
         "x_coordinate": -3.1083,
         "y_coordinate": 7.1772
      },
      {
         "id": 63,
         "name": "Isaac Silva",
         "x_coordinate": -9.3628,
         "y_coordinate": 32.4804
      }
      // ...
   ]
}
```

Estas são as rotas da API e suas respectivas entradas e saídas. Certifique-se de ajustar as URLs conforme necessário e
utilize os métodos HTTP apropriados para cada operação.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).