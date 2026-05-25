BACKEND_DIR  := backend
FRONTEND_DIR := frontend

.PHONY: db db-down db-reset api front clean

db:
	docker compose up -d

db-down:
	docker compose down

db-reset:
	docker compose down -v && docker compose up -d

api: db
	cd $(BACKEND_DIR) && mvn spring-boot:run -Dspring-boot.run.profiles=local

frontend/node_modules: frontend/package.json frontend/yarn.lock
	cd $(FRONTEND_DIR) && yarn install
	@touch $@

front: frontend/node_modules
	cd $(FRONTEND_DIR) && yarn dev

clean:
	rm -rf $(BACKEND_DIR)/target $(FRONTEND_DIR)/node_modules
