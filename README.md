# DVINCIX

Catálogo online de peças e acessórios desenvolvido em Node.js, Express, Nginx e Cloudflare.

## Infraestrutura

```text
Cliente
   ↓
Cloudflare
   ↓
Hetzner Cloud
   ↓
Nginx
   ↓
PM2 Cluster
   ↓
Node.js / Express
```

## Tecnologias

* Node.js
* Express
* Nginx
* PM2
* Cloudflare
* GitHub

## Estrutura do Projeto

```text
catalogo/
├── public/
│   ├── index.html
│   ├── catalogo.html
│   ├── produto.html
│   ├── style.css
│   ├── catalogo.css
│   ├── produto.css
│   └── produto.js
├── server.js
├── package.json
├── package-lock.json
└── deploy.sh
```

## Instalação

```bash
git clone git@github.com:Dan1iel-Dias/dvincix.git

cd dvincix

npm install
```

## Execução Local

```bash
npm start
```

Aplicação disponível em:

```text
http://localhost:3000
```

## Deploy

Na VM:

```bash
cd /var/www/catalogo

./deploy.sh
```

O script executa:

```bash
git pull
npm install
pm2 restart catalogo
pm2 save
```

## PM2

Verificar status:

```bash
pm2 list
```

Logs:

```bash
pm2 logs catalogo
```

Monitoramento:

```bash
pm2 monit
```

Reiniciar aplicação:

```bash
pm2 restart catalogo
```

## Domínio

Produção:

```text
https://dvincix.com.br
```

## Roadmap

### Fase 1

* [x] Landing Page
* [x] Catálogo
* [x] Página de Produto
* [x] Deploy Hetzner
* [x] Cloudflare

### Fase 2

* [ ] PostgreSQL
* [ ] Painel Administrativo
* [ ] Cadastro de Produtos
* [ ] Upload de Imagens
* [ ] Cloudflare R2

### Fase 3

* [ ] Carrinho
* [ ] Pedidos
* [ ] Mercado Pago
* [ ] Área do Cliente

## Ambiente de Produção

Servidor:

```text
Hetzner Cloud
Ubuntu 26.04 LTS
4 GB RAM
40 GB SSD
```

Process Manager:

```text
PM2 Cluster
```

Proxy Reverso:

```text
Nginx
```

CDN:

```text
Cloudflare
```

