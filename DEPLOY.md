# Deploy — lp.querotreinar.com (VPS Hostinger + Node)

Guia para rodar esta landing page (Next.js, `output: standalone`) no seu **VPS da
Hostinger** e apontar **lp.querotreinar.com** para ela.

> Substitua `SEU_IP_DO_VPS` pelo IP do seu VPS e use o usuário SSH do seu painel.

---

## 0. Pré-requisitos
- VPS com acesso **SSH** (root ou sudo).
- **Node.js 24+** e **Nginx** instalados (passos abaixo).
- O código do projeto (via `git clone` ou upload).

---

## 1. Conectar no VPS e instalar Node 24 + ferramentas
```bash
ssh root@SEU_IP_DO_VPS

# Node 24 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
nvm install 24 && nvm use 24 && nvm alias default 24

# Nginx, PM2 e Certbot
apt update && apt install -y nginx
npm install -g pm2
apt install -y certbot python3-certbot-nginx
```

## 2. Subir o código
A forma mais fácil é versionar no GitHub e clonar. **Evite uma pasta com `:` no
nome** (o `npm run` quebra). Ex.: use `/var/www/lp-querotreinar`.
```bash
mkdir -p /var/www && cd /var/www
git clone <URL_DO_SEU_REPO> lp-querotreinar
cd lp-querotreinar
```
> Se preferir sem git: suba a pasta do projeto **sem** `node_modules` e `.next` via SFTP.

## 3. Instalar dependências e buildar (standalone)
```bash
cd /var/www/lp-querotreinar
npm install            # se falhar no postinstall do unrs-resolver, use: npm install --ignore-scripts
npm run build:standalone
```
`build:standalone` roda o `next build` e copia `.next/static` + `public/` para
dentro de `.next/standalone` (necessário, senão os assets dão 404).

Teste rápido (Ctrl+C pra sair):
```bash
PORT=3000 HOSTNAME=127.0.0.1 node .next/standalone/server.js
```

## 4. Manter rodando com PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup            # rode o comando que ele imprimir (para subir no boot)
pm2 logs lp-querotreinar   # ver logs
```
O app fica escutando em `127.0.0.1:3000` (só local; o Nginx é a porta pública).

## 5. Nginx (proxy reverso)
```bash
cp deploy/nginx-lp.conf /etc/nginx/sites-available/lp.querotreinar.com
ln -s /etc/nginx/sites-available/lp.querotreinar.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 6. DNS — apontar o subdomínio (painel da Hostinger)
No **hPanel da Hostinger** → **Domínios → querotreinar.com → DNS / Zona DNS**,
crie um registro:

| Tipo | Nome | Valor / Aponta para | TTL |
|------|------|---------------------|-----|
| A    | `lp` | `SEU_IP_DO_VPS`      | 3600 |

> Se for VPS da própria Hostinger, o IP está no painel do VPS. Propagação: alguns minutos a algumas horas.

## 7. HTTPS (SSL grátis — Let's Encrypt)
Depois que o DNS propagar (o `lp.querotreinar.com` já resolve pro IP):
```bash
certbot --nginx -d lp.querotreinar.com
```
O Certbot configura o HTTPS e a renovação automática. Pronto: **https://lp.querotreinar.com** 🎉

---

## Atualizar o site depois de mudanças
```bash
cd /var/www/lp-querotreinar
git pull
npm install            # só se mudaram dependências
npm run build:standalone
pm2 restart lp-querotreinar
```

## Dicas
- **Firewall:** libere as portas 80 e 443 (`ufw allow 'Nginx Full'`).
- **Vídeos pesados (~114MB):** funcionam, mas se ficar lento, vale mover os
  vídeos para um CDN/serviço de vídeo (Cloudflare Stream, Bunny, etc.) depois.
- **Porta em uso:** mude `PORT` no `ecosystem.config.js` (e no Nginx) se a 3000
  já estiver ocupada.
