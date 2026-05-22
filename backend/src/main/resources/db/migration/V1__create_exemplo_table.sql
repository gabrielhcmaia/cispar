-- ⚠️ Feature de exemplo (descartável) — criada apenas para validar a integração do stack
-- Remover esta migration quando o desenvolvimento real começar.
CREATE TABLE exemplo (
    id        BIGSERIAL    PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    criado_em TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
