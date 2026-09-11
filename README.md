# Clínica Odontológica API

Projeto acadêmico desenvolvido para gerenciamento de clínica odontológica utilizando arquitetura em camadas.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT
- HTML
- CSS

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Cadastro de pacientes
- Cadastro de dentistas
- Agendamento de consultas
- Rotas protegidas

## Estrutura do projeto

```bash
src/
├── controllers
├── routes
├── middlewares
├── lib
└── server.js
```

## Rotas principais

### Auth

- POST /auth/register
- POST /auth/login

### Patients

- GET /patients
- POST /patients
- PUT /patients/:id
- DELETE /patients/:id

### Dentists

- GET /dentists
- POST /dentists

### Appointments

- GET /appointments
- POST /appointments



## Front-end

O projeto possui uma interface simples em HTML/CSS localizada na pasta:

```bash
frontend/
```

## Autor

Henrique Cairo
