# Projeto MyContacts

### Projeto é uma lista de contatos

Projeto desenvolvido no curso [JStack](https://jstack.com.br/) <span><img style="width: 56px" src="demo/logo-curso.png" align="center" /></span> do Mateus Silva, usando as técnologias React no Frontend e NestJs no Backend. Aplicação é um gerenciador de finanças que caulcula receitas e despesas.


### Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!


## Dashboard:
<h1>
    <img src="demo/Home.png" align="center" />
</h1>


## Registrando usuário:
<h1>
    <img src="demo/register.png" align="center" />
</h1>

# Responsivo mais adição de receitas:
<h1>
    <img src="demo/responsive.png" align="center" />
</h1> 

# Edição da conta financeira:
<h1>
    <img src="demo/Edit.png" align="center" />
</h1> 

# Deletar da conta:
<h1>
    <img src="demo/delete-account.png" align="center" />
</h1> 


### **Instruções para executar o projeto**:

Execute os comando abaixo:

```bash
# Criando o container docker para o banco de dados:

$ docker run --name pg-fincheck -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

-----------------------------------------------------
| ## Agora podemos clonar o projeto e iniciar a aplicação ## |
-----------------------------------------------------

# Clonando o repositório
$ git clone https://github.com/Gerson77/mycontacts.git

# Entre nos diretórios
$ cd diretório


# Antes de iniciar o projeto devemos configuras as variaveis de ambiente. Crie um arquivo .env com a url da API no diretório Frontend

$ touch .env

# Conteúdo do arquivo
VITE_URL_API="http://localhost:3000"


# Faça o mesmo para o backend

DATABASE_URL="postgresql://root:root@localhost:5432/fincheck?schema=public"

JWT_SECRET="JWT_secret"

# Instalando as dependências do projeto.
$ init i

# Iniciando o projeto no Backend:
$ npm run start:dev

# Iniciando o projeto no Frontend:

$ npm run dev
```
