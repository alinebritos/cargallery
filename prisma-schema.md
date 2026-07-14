# Prisma Schema — Apex Motors

Schema completo do banco de dados baseado em todos os inputs e entidades do sistema.

---

## Configuração do datasource e generator

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Enums

```prisma
enum VehicleCategory {
  ESPORTIVOS
  SUV
  SEDA
}

enum VehicleStatus {
  ACTIVE
  PAUSED
}

enum LeadStatus {
  NEW
  IN_PROGRESS
  CLOSED
}

enum UserRole {
  ADMIN
  EDITOR
}
```

---

## Models

### User
Usuários com acesso à área administrativa.

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**Campos do formulário de login:**
| Campo      | Input no sistema   | Tipo     |
|------------|--------------------|----------|
| `email`    | Campo "Usuário"    | `String` |
| `password` | Campo "Senha"      | `String` |

---

### Vehicle
Veículos cadastrados e exibidos na galeria pública.

```prisma
model Vehicle {
  id          String          @id @default(cuid())
  name        String
  brand       String
  year        Int
  price       Float
  km          Int
  category    VehicleCategory
  status      VehicleStatus   @default(ACTIVE)
  image       String?
  description String?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  leads Lead[]

  @@map("vehicles")
}
```

**Campos do formulário de cadastro de veículo:**
| Campo         | Input no sistema      | Tipo               |
|---------------|-----------------------|--------------------|
| `brand`       | Campo "Marca"         | `String`           |
| `name`        | Campo "Modelo"        | `String`           |
| `year`        | Campo "Ano"           | `Int`              |
| `km`          | Campo "Quilometragem" | `Int`              |
| `price`       | Campo "Preço (R$)"    | `Float`            |
| `category`    | Select "Categoria"    | `VehicleCategory`  |
| `image`       | Campo "URL da Imagem" | `String?`          |
| `description` | Campo "Descrição"     | `String?`          |
| `status`      | Ação Pausar/Ativar    | `VehicleStatus`    |

---

### Lead
Solicitações de proposta enviadas pelo formulário de contato do site.

```prisma
model Lead {
  id        String     @id @default(cuid())
  name      String
  phone     String
  email     String
  message   String?
  status    LeadStatus @default(NEW)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  vehicleId String?
  vehicle   Vehicle? @relation(fields: [vehicleId], references: [id])

  @@map("leads")
}
```

**Campos do formulário de contato (site público):**
| Campo       | Input no sistema              | Tipo        |
|-------------|-------------------------------|-------------|
| `name`      | Campo "Nome completo"         | `String`    |
| `phone`     | Campo "WhatsApp / Telefone"   | `String`    |
| `email`     | Campo "E-mail"                | `String`    |
| `message`   | Campo "Mensagem"              | `String?`   |
| `vehicleId` | Veículo de interesse (futuro) | `String?`   |

---

## Schema completo (arquivo `schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ────────────────────────────────────────────

enum VehicleCategory {
  ESPORTIVOS
  SUV
  SEDA
}

enum VehicleStatus {
  ACTIVE
  PAUSED
}

enum LeadStatus {
  NEW
  IN_PROGRESS
  CLOSED
}

enum UserRole {
  ADMIN
  EDITOR
}

// ─── Models ───────────────────────────────────────────

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Vehicle {
  id          String          @id @default(cuid())
  name        String
  brand       String
  year        Int
  price       Float
  km          Int
  category    VehicleCategory
  status      VehicleStatus   @default(ACTIVE)
  image       String?
  description String?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  leads Lead[]

  @@map("vehicles")
}

model Lead {
  id        String     @id @default(cuid())
  name      String
  phone     String
  email     String
  message   String?
  status    LeadStatus @default(NEW)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  vehicleId String?
  vehicle   Vehicle? @relation(fields: [vehicleId], references: [id])

  @@map("leads")
}
```

---

## Relações

```
User      → sem relações diretas (admin independente)
Vehicle   → Lead[]   (um veículo pode ter várias solicitações)
Lead      → Vehicle? (opcional: lead vinculado a um veículo específico)
```

---

## Comandos Prisma

```bash
# Instalar dependências
npm install prisma @prisma/client

# Inicializar Prisma no projeto
npx prisma init

# Gerar o client após editar o schema
npx prisma generate

# Criar e aplicar a migration inicial
npx prisma migrate dev --name init

# Abrir o Prisma Studio (visualizar dados)
npx prisma studio

# Resetar o banco (cuidado: apaga todos os dados)
npx prisma migrate reset
```

---

## Variáveis de ambiente (`.env`)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/apex_motors?schema=public"
```
