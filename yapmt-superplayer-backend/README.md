## Instalação

## Banco
- Baixe, instale o rode o MongoDB
- MongoDB: https://www.mongodb.com/download-center/community

## Server
- Baixe o NPM: http://blog.npmjs.org/post/85484771375/how-to-install-npm
- npm install

## Execução  

- npm start  

## Configurando o banco e o servidor

- Todas as configurações de conexãode banco de dados e portas do servidor devem ser configuradao no arquivo /config/config.js

## Rotas  

- API http://localhost:3000

### GET /projects

- Exemplo de requisição: 
/getArrecadacoesCategoria

- Retorno
```javascript
[
    {
        "_id": "5d34cb7014d6b350800a7a0e",
        "name": "Projeto1",
        "tasks": [
            {
                "status": "late",
                "completed": false,
                "_id": "5d34cb7a14d6b350800a7a0f",
                "description": "task1",
                "owner": "eu",
                "due_date": "2019-07-20T03:00:00.000Z",
                "due_date_string": "Yesterday"
            },
            {
                "status": "completed",
                "completed": true,
                "_id": "5d34cb8314d6b350800a7a10",
                "description": "task2",
                "owner": "eu",
                "due_date": "2019-07-22T03:00:00.000Z",
                "due_date_string": "Tomorrow"
            },
            {
                "status": "in time",
                "completed": false,
                "_id": "5d34cb8b14d6b350800a7a11",
                "description": "task3",
                "owner": "eu",
                "due_date": "2019-07-21T03:00:00.000Z",
                "due_date_string": "Today"
            }
        ],
        "__v": 0
    },
    {
        "_id": "5d34cb9214d6b350800a7a12",
        "name": "Projeto2",
        "tasks": [],
        "__v": 0
    }
]
```

### GET /project

- Exemplo de requisição: 
/project/Projeto1

- Retorno
```javascript
{
    "_id": "5d34cb7014d6b350800a7a0e",
    "name": "Projeto1",
    "tasks": [
        {
            "status": "late",
            "completed": false,
            "_id": "5d34cb7a14d6b350800a7a0f",
            "description": "task1",
            "owner": "eu",
            "due_date": "2019-07-20T03:00:00.000Z",
            "due_date_string": "Yesterday"
        },
        {
            "status": "in time",
            "completed": true,
            "_id": "5d34cb8314d6b350800a7a10",
            "description": "task2",
            "owner": "eu",
            "due_date": "2019-07-22T03:00:00.000Z",
            "due_date_string": "Tomorrow"
        },
        {
            "status": "in time",
            "completed": false,
            "_id": "5d34cb8b14d6b350800a7a11",
            "description": "task3",
            "owner": "eu",
            "due_date": "2019-07-21T03:00:00.000Z",
            "due_date_string": "Today"
        }
    ],
    "__v": 0
}
```

### POST /createProject

- Exemplo de requisição: 
/createProject

body:
```javascript
    {
        "name": "Project2"
    }
```

- Retorno sucesso
```javascript
{
    "message": "Projeto criado"
}
```

- Retorno de erro 
```javascript
{
    "message": "Erro"
}
```

### POST /createTask

- Exemplo de requisição: 
/createTask

body:
```javascript
    {
        "name": "Project1",
        "task": {
            "description": "task5",
            "due_date": "Sun Jul 21 2019 00:00:00",
            "owner": "eu"
        }
    }
```

- Retorno sucesso
```javascript
{
    "message": "Task criada"
}
```

- Retorno de erro 
```javascript
{
    "message": "Erro"
}
```

### POST /updateTask

- Exemplo de requisição: 
/updateTask

body:
```javascript
    {
        "name": "Project1",
        "_id": "5d34ccda14d6b350800a7a14" 
    }
```

- Retorno sucesso
```javascript
{
    "message": "Task atualizada"
}
```

- Retorno de erro 
```javascript
{
    "message": "Erro"
}
```

router.delete("/deleteProject/:id", ProjectController.deleteProject);

### DELETE /deleteProject

- Exemplo de requisição: 
/deleteProject/5d34cc6114d6b350800a7a13

- Retorno
```javascript
{
    "message": "Projeto removido"
}
```

- Retorno de erro 
```javascript
{
    "message": "Erro"
}
```