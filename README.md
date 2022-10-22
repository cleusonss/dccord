# Projeto Web Chat da Disciplina - DCC704 - UFRR

### Nextjs - Nodejs - MongoDB e WebSockets

## Pré-requisitos

- Necessário ter acesso a um servidor de Banco de Dados, o projeto está precondigurado para **MongoDB** (local ou cloud)
- Node.js instalado em sua versão atualizada LTS

## Passo a passo (para linux)

```bash
git clone https://github.com/acauanrr/dccord.git
cd dccord/
```

1. Crie as variávie de ambiente no **/backend**

```bash
cd backend/
touch .env
```

2. Após criar o arquivo _.env_, copie e cole as variáveis seguintes fazendo as alterações necessárias:

```bash
API_PORT=4001
MONGO_URI=mongodb://127.0.0.1:27017/dccord
TOKEN_KEY=''
MONGO_CLOUD_URI=''
```

> Pode-se gerar o **TOKEN_KEY** por <https://emn178.github.io/online-tools/sha256.html>
> e configurar o banco de dados de maneira remota para obert o **MONGO_CLOUD_URI** em <https://cloud.mongodb.com/>

1. Estando na pasta /backend, instale as dependências e suba o serviço

```bash
npm i
npm run dev
```

4. Configurando o **frontend**

```bash
cd .. //*(volte para dccord/ )*
cd frontend/
```

5.  As variáveis de ambiente nesta versão do **Nextjs** ficam no arquivo:

```bash
next.config.js
```

6. Instale as dependências e suba o frontend

```bash
npm i
npm run dev
```

8.  Abra o navegador e acesse o sistema

```bash
[localhost:3000](http://localhost:3000/)
```