CREATE TYPE uf_enum AS ENUM ('PR');

ALTER TABLE cidades ADD COLUMN uf uf_enum;