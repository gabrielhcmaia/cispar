ALTER TABLE users
    ADD CONSTRAINT uq_users_username UNIQUE (username);

ALTER TABLE manutencoes
    ADD CONSTRAINT fk_manutencoes_solicitante
    FOREIGN KEY (solicitante_id) REFERENCES users(id);
