CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM (
    'USER',
    'ADMIN'
);

DROP TABLE usuarios CASCADE;

CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    username   VARCHAR(100) NOT NULL unique,
    password   VARCHAR(60) NOT NULL,
    role       user_role NOT NULL DEFAULT 'USER',
    active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
