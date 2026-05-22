# CISPAR — Sistema de Controle de Autarquias de Água

Sistema de gestão para autarquias de abastecimento de água do município de Sarandi (PR).

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 21 · Spring Boot 3.4 · Maven |
| Frontend | React 18 · TypeScript strict · MUI v6 · Vite · Yarn |
| Banco | PostgreSQL 16 |
| Containers | Docker · Docker Compose |
| Infraestrutura alvo | Oracle Cloud Infrastructure (OCI) — containers |

---

## Pré-requisitos

- **Docker 24+** e **Docker Compose v2**
- *(Opcional para dev local sem Docker)* Java 21 + Maven 3.9 / Node 20 + Yarn

---

## Subir o ambiente de desenvolvimento

```bash
docker compose up
```

Na **primeira execução** o Maven baixa as dependências (~5 min). As execuções seguintes são rápidas graças ao cache de volumes nomeados.

Para rodar em background:
```bash
docker compose up -d
docker compose logs -f   # acompanhar logs
```

Para parar e limpar:
```bash
docker compose down          # para e remove containers (volumes persistem)
docker compose down -v       # idem + apaga volumes (reset completo do banco)
```

Reconstruir imagens após mudar dependências:
```bash
docker compose build --no-cache
```

---

## Portas

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | <http://localhost:5173> | App React — Vite dev server |
| Backend | <http://localhost:8080> | API Spring Boot |
| Health | <http://localhost:8080/actuator/health> | Actuator health check |
| Adminer | <http://localhost:8090> | Interface web do PostgreSQL |
| PostgreSQL | `localhost:5432` | Banco de dados |

### Credenciais do banco (dev)

```
Host:     localhost:5432
Database: cispar
User:     cispar
Password: cispar_dev
```

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
│       └── application*.yml # perfis: local · homolog · prod
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
├── docker-compose.yml       # ambiente dev completo
└── README.md
```

---

## ⚠️ Feature de exemplo (descartável)

A feature `exemplo` — entidade com `id`, `nome`, `criadoEm`, endpoints `GET/POST /api/exemplos` e tela no frontend — existe **somente para validar a integração end-to-end** (frontend → backend → PostgreSQL via Flyway).

**Remover quando o desenvolvimento real começar.**

---

## Ambientes

### Local / Desenvolvimento (ativo)

```bash
docker compose up
```

Perfil Spring: `local` · variáveis via `docker-compose.yml` · `.env.local` no frontend.

### Homologação (a configurar)

Subir com perfil `homolog`:
```bash
SPRING_PROFILES_ACTIVE=homolog \
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>/cispar \
SPRING_DATASOURCE_USERNAME=<user> \
SPRING_DATASOURCE_PASSWORD=<senha> \
CORS_ALLOWED_ORIGINS=https://<dominio-homolog> \
java -jar cispar-api.jar
```

Variáveis de ambiente do frontend: preencher `frontend/.env.homolog` e fazer build com `yarn build --mode homolog`.

### Produção — Oracle Cloud Infrastructure (a configurar)

Deploy como container (OKE ou VM com Docker). As imagens de produção são geradas pelos Dockerfiles multi-stage em `backend/Dockerfile` e `frontend/Dockerfile`.

Configure no painel da OCI / secrets manager:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `CORS_ALLOWED_ORIGINS` (domínio de produção — a definir)
- `VITE_API_URL` (URL da API em produção — a definir)

O domínio de produção ainda será definido; toda a config é via variáveis de ambiente.

---

## Colaboração

- Repositório principal: **GitLab** (desenvolvimento, MRs, code review)
- Mirror público: **GitHub** (somente leitura — fork/clone, sem push)
- Toda alteração passa por Merge Request no GitLab e aprovação do administrador
