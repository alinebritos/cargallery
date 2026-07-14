# Configuração de Ambiente e Segurança

Este guia explica como configurar variáveis de ambiente **antes** do primeiro commit e push para o GitHub.

## Por que isso importa

- Chaves de API e tokens **nunca** devem ir para o repositório público ou compartilhado.
- O arquivo `.env` fica **somente na sua máquina** (listado no `.gitignore`).
- O arquivo `.env.example` **pode** ser commitado — serve de modelo sem expor segredos.

## Setup rápido

### 1. Copiar o template (se ainda não existir `.env`)

```bash
cp .env.example .env
```

> No Windows (PowerShell): `Copy-Item .env.example .env`

### 2. Preencher as chaves do Supabase

1. Abra o [Dashboard do Supabase](https://supabase.com/dashboard/project/nxudwizahbttizwpabjg/settings/api).
2. Em **Project URL**, confirme: `https://nxudwizahbttizwpabjg.supabase.co`
3. Em **Project API keys**, copie a chave **`anon` `public`**.
4. Cole no `.env`:

```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Usar no código (Vite + React)

Variáveis expostas ao browser **precisam** do prefixo `VITE_`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

Reinicie o servidor de dev após alterar o `.env`:

```bash
pnpm dev
```

## Variáveis disponíveis

| Variável | Onde usar | Commitável? |
|----------|-----------|-------------|
| `VITE_SUPABASE_URL` | Front-end | Só no `.env.example` (placeholder) |
| `VITE_SUPABASE_ANON_KEY` | Front-end | Só no `.env.example` (placeholder) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side / CI apenas | **Nunca** no front-end |

## Checklist antes do commit

- [ ] `.env` existe localmente e está preenchido
- [ ] `.env` está listado no `.gitignore`
- [ ] `.env.example` está atualizado (sem valores reais)
- [ ] Nenhum arquivo staged contém chaves (`git diff --staged`)
- [ ] `pnpm dev` / `pnpm build` funcionam com as variáveis

## Verificar se segredos não vão no commit

```bash
git status
git diff --staged
```

Se `.env` aparecer como untracked ou ignored, está correto. Se aparecer como **staged**, remova:

```bash
git reset HEAD .env
```

## Produção (Vercel / GitHub Actions)

Configure as mesmas variáveis no painel do provedor:

- **Vercel:** Project → Settings → Environment Variables
- **GitHub Actions:** Repository → Settings → Secrets and variables → Actions

Use os mesmos nomes (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

## Obter chaves via MCP (Cursor)

Com o Supabase conectado via MCP no Cursor, peça ao agente:

> "Busque a URL e a chave anon do Supabase e preencha meu `.env` local."

O agente **não** commitará o `.env` — apenas preenche localmente.

## Referências

- [Supabase — API Settings](https://supabase.com/dashboard/project/nxudwizahbttizwpabjg/settings/api)
- [Vite — Env Variables](https://vite.dev/guide/env-and-mode.html)
- [Supabase — Managing Secrets](https://supabase.com/docs/guides/platform/going-into-prod#secrets)
