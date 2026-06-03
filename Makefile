BACKEND_DIR  := backend
FRONTEND_DIR := frontend

DB_URL  := postgresql://cispar:cispar_dev@localhost:5433/cispar?sslmode=disable
MIGRATE := docker run --rm --network host -v $(PWD)/migrations:/migrations migrate/migrate \
           -path=/migrations -database "$(DB_URL)"

.PHONY: db db-down db-reset api front clean \
        db-migrate-up db-migrate-down db-migrate-down-all db-migrate-version

db:
	docker compose up -d

db-down:
	docker compose down

db-reset:
	docker compose down -v && docker compose up -d

db-migrate-up:
	$(MIGRATE) up

db-migrate-down:
	$(MIGRATE) down 1

db-migrate-down-all:
	$(MIGRATE) down -all

db-migrate-version:
	$(MIGRATE) version

api:
	cd $(BACKEND_DIR) && mvn spring-boot:run -Dspring-boot.run.profiles=local

frontend/node_modules: frontend/package.json frontend/yarn.lock
	cd $(FRONTEND_DIR) && yarn install
	@touch $@

front: frontend/node_modules
	cd $(FRONTEND_DIR) && yarn dev

clean:
	rm -rf $(BACKEND_DIR)/target $(FRONTEND_DIR)/node_modules
