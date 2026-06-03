# CISPAR — Sistema de Controle de Autarquias de Água

Sistema de gestão para autarquias de abastecimento de água do município de Sarandi (PR).

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 21 · Spring Boot 3.4 · Maven |
| Frontend | React 18 · TypeScript strict · MUI v6 · Vite · Yarn |
| Banco | PostgreSQL 16 · golang-migrate |
| Infra alvo | Oracle Cloud Infrastructure (OCI) |

---

## Pré-requisitos

- **Docker 24+** e **Docker Compose v2**
- **Java 21** + **Maven 3.9+**
- **Node 22+** + **Yarn 1.22+** (versões em `.tool-versions` para `asdf`)
- **make**

---

## Subindo o ambiente

```bash
make db      # terminal 1 — sobe o PostgreSQL
make api     # terminal 2 — sobe o backend (perfil local)
make front   # terminal 3 — sobe o frontend Vite
```

---

## Migrations (golang-migrate)

As migrations ficam em `migrations/` na raiz do repositório e são aplicadas via Docker (sem instalação local do CLI).

```bash
make db-migrate-up          # aplica todas as migrations pendentes
make db-migrate-down        # desfaz a última migration
make db-migrate-down-all    # desfaz todas as migrations
make db-migrate-version     # exibe a versão atual do schema
```

**Convenção de nomes:** `{6-dígitos}_{descricao_snake_case}.up.sql` e `.down.sql`.
Nunca altere ou delete uma migration já executada — crie sempre uma nova.

---

## Referência de comandos (Makefile)

| Comando | Descrição |
|---------|-----------|
| `make db` | Sobe o PostgreSQL |
| `make db-down` | Para o container |
| `make db-reset` | Apaga o volume e recria o banco do zero |
| `make api` | Inicia o backend Spring Boot |
| `make front` | Inicia o frontend Vite |

---

## Portas

| Serviço | URL |
|---------|-----|
| Frontend | <http://localhost:5173> |
| Backend | <http://localhost:8080> |
| Health | <http://localhost:8080/actuator/health> |
| PostgreSQL | `localhost:5433` |

---

## Conectar ao banco (DBeaver)

| Campo | Valor |
|-------|-------|
| Host | `localhost` |
| Port | `5433` |
| Database | `cispar` |
| Username | `cispar` |
| Password | `cispar_dev` |

---

## Produção (OCI)

Imagens geradas pelos Dockerfiles multi-stage em `backend/Dockerfile` e `frontend/Dockerfile`. Configure no secrets manager da OCI:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `CORS_ALLOWED_ORIGINS`
- `VITE_API_URL`

---

## Colaboração

- Repositório principal: **GitLab** (MRs, code review)
- Mirror público: **GitHub** (somente leitura)
