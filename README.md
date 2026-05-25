# CISPAR — Sistema de Controle de Autarquias de Água

Sistema de gestão para autarquias de abastecimento de água do município de Sarandi (PR).

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 21 · Spring Boot 3.4 · Maven |
| Frontend | React 18 · TypeScript strict · MUI v6 · Vite · Yarn |
| Banco | PostgreSQL 16 |
| Infraestrutura alvo | Oracle Cloud Infrastructure (OCI) — containers |

---

## Pré-requisitos

- **Docker 24+** e **Docker Compose v2** — para o banco de dados
- **Java 21** + **Maven 3.9+** — para rodar o backend
- **Node 22+** + **Yarn 1.22+** — para rodar o frontend (`asdf` recomendado — versões em `.tool-versions`)
- **make** — para usar os atalhos do Makefile

---

## Atalhos (Makefile)

Todos os comandos abaixo rodam a partir da raiz do repositório:

| Comando | Descrição |
|---------|-----------|
| `make db` | Sobe o PostgreSQL em background |
| `make api` | Inicia o backend Spring Boot (perfil `local`) |
| `make front` | Inicia o frontend Vite |
| `make db-down` | Para o container do banco |
| `make db-reset` | Apaga o volume e recria o banco do zero |

**Fluxo de desenvolvimento:**
```bash
make db      # terminal 1 — sobe o banco
make api     # terminal 2 — sobe o backend
make front   # terminal 3 — sobe o frontend
```

---

## Subir o ambiente de desenvolvimento

### Pré-requisito: banco de dados

```bash
make db
```

Para acompanhar os logs:
```bash
docker compose logs -f
```

### Backend (Spring Boot)

```bash
make api
```

Equivalente a `cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=local`. O perfil `local` usa as credenciais padrão do banco em `localhost:5432`.

### Frontend (Vite)

```bash
make front
```

Na primeira execução o `make front` instala as dependências automaticamente. A variável `VITE_API_URL` pode ser ajustada em `frontend/.env.local` (padrão: `http://localhost:8080`).

---

## Portas

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | <http://localhost:5173> | App React — Vite dev server |
| Backend | <http://localhost:8080> | API Spring Boot |
| Health | <http://localhost:8080/actuator/health> | Actuator health check |
| PostgreSQL | `localhost:5432` | Banco de dados |

---

## Conectar ao banco com DBeaver

1. Abra o DBeaver e clique em **Nova Conexão** (ícone de tomada com `+`).
2. Selecione **PostgreSQL** e clique em **Avançar**.
3. Preencha a aba **Principal**:

| Campo | Valor |
|-------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `cispar` |
| Username | `cispar` |
| Password | `cispar_dev` |

4. Clique em **Testar Conexão** — o DBeaver pode pedir para baixar o driver PostgreSQL na primeira vez, basta confirmar.
5. Clique em **Concluir**.

> O banco só estará acessível enquanto o container estiver rodando (`docker compose up -d`).

---

## Estrutura do monorepo

```
cispar/
├── backend/                 # Spring Boot · Maven · Java 21
│   ├── src/main/java/br/com/cispar/
│   │   ├── controller/      # REST — recebe/retorna DTOs
│   │   ├── service/         # interfaces (DIP)
│   │   │   └── impl/        # implementações
│   │   ├── repository/      # Spring Data JPA
│   │   ├── domain/          # entidades JPA
│   │   ├── dto/             # request · response · mappers
│   │   ├── config/          # beans, CORS
│   │   └── exception/       # @RestControllerAdvice global
│   └── src/main/resources/
│       ├── db/migration/    # Flyway — versiona o schema
│       └── application*.yml # perfis: local · prod
├── frontend/                # React · Vite · TS strict · MUI
│   └── src/
│       ├── features/        # organização por feature
│       ├── components/      # componentes compartilhados
│       ├── services/        # camada API (Axios)
│       ├── hooks/
│       ├── types/           # tipos da API
│       ├── theme/           # tema MUI
│       └── routes/          # React Router
├── docker/                  # configs auxiliares (nginx.conf prod)
├── .tool-versions           # versões Node/Java/Yarn via asdf
├── Makefile                 # atalhos: make db · make api · make front
├── docker-compose.yml       # PostgreSQL (dev)
└── README.md
```

---

## ⚠️ Feature de exemplo (descartável)

A feature `exemplo` — entidade com `id`, `nome`, `criadoEm`, endpoints `GET/POST /api/exemplos` e tela no frontend — existe **somente para validar a integração end-to-end** (frontend → backend → PostgreSQL via Flyway).

**Remover quando o desenvolvimento real começar.**

---

## Produção — Oracle Cloud Infrastructure

As imagens de produção são geradas pelos Dockerfiles multi-stage em `backend/Dockerfile` e `frontend/Dockerfile`.

Configure no painel da OCI / secrets manager:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `CORS_ALLOWED_ORIGINS` (domínio de produção — a definir)
- `VITE_API_URL` (URL da API em produção — a definir)

---

## Colaboração

- Repositório principal: **GitLab** (desenvolvimento, MRs, code review)
- Mirror público: **GitHub** (somente leitura — fork/clone, sem push)
- Toda alteração passa por Merge Request no GitLab e aprovação do administrador
