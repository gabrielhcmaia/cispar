-- TABELAS AUXILIARES

CREATE TABLE cidades (
    id      SERIAL PRIMARY KEY,
    nome    VARCHAR(100) NOT NULL,
    regiao  VARCHAR(100)
);

CREATE TABLE marcas (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE unidades_medida (
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(50) NOT NULL,
    sigla VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE fornecedores (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(150) NOT NULL,
    cnpj     VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    email    VARCHAR(150),
    ativo    BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tecnicos (
    id            SERIAL PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    telefone      VARCHAR(20),
    email         VARCHAR(150),
    especialidade VARCHAR(100),
    ativo         BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE usuarios (
    id         SERIAL PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo      BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- POÇOS

CREATE TABLE pocos (
    id                  SERIAL PRIMARY KEY,
    nome                VARCHAR(100) NOT NULL,
    cidade_id           INT REFERENCES cidades(id),
    logradouro          VARCHAR(200),
    latitude            DECIMAL(9,6),
    longitude           DECIMAL(9,6),
    diametro            DECIMAL(10,2),
    unidade_diametro_id INT REFERENCES unidades_medida(id),
    cabo_eletrico       VARCHAR(100),
    tubo_medida         DECIMAL(10,2),
    nivel_estatico      DECIMAL(10,2),
    ligacao             VARCHAR(100),
    profundidade_bomba  DECIMAL(10,2),
    ativo               BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EQUIPAMENTOS

CREATE TABLE equipamentos (
    id                     SERIAL PRIMARY KEY,
    identificacao          VARCHAR(50) NOT NULL UNIQUE,
    nome                   VARCHAR(150) NOT NULL,
    marca_id               INT REFERENCES marcas(id),
    modelo                 VARCHAR(100),
    potencia               DECIMAL(10,2),
    unidade_potencia_id    INT REFERENCES unidades_medida(id),
    vazao                  DECIMAL(10,2),
    unidade_vazao_id       INT REFERENCES unidades_medida(id),
    poco_id                INT REFERENCES pocos(id),
    observacoes            TEXT,
    curva_bomba_arquivo    VARCHAR(500),
    data_aquisicao         DATE,
    data_inicio_operacao   DATE,
    fornecedor_id          INT REFERENCES fornecedores(id),
    garantia_ate           DATE,
    estado_conservacao     VARCHAR(20) CHECK (
                               estado_conservacao IN ('bom','regular','ruim')
                           ),
    medida_trabalho        DECIMAL(10,2),
    unidade_medida_trab_id INT REFERENCES unidades_medida(id),
    arquivo_extra          VARCHAR(500),
    ativo                  BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em              TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MANUTENÇÕES

CREATE TABLE manutencoes (
    id                   SERIAL PRIMARY KEY,
    numero               VARCHAR(50) NOT NULL UNIQUE,
    tipo                 VARCHAR(20) NOT NULL CHECK (
                             tipo IN ('preventiva','preditiva','corretiva')
                         ),
    equipamento_id       INT NOT NULL REFERENCES equipamentos(id),
    solicitante_id       INT REFERENCES usuarios(id),
    condicao_equipamento VARCHAR(20) CHECK (
                             condicao_equipamento IN ('parado','funcionando')
                         ),
    observacao           TEXT,
    status               VARCHAR(20) NOT NULL DEFAULT 'aberta' CHECK (
                             status IN ('aberta','encerrada')
                         ),
    aberta_em            TIMESTAMP NOT NULL DEFAULT NOW(),
    encerrada_em         TIMESTAMP
);

CREATE TABLE manutencao_mao_obra (
    id            SERIAL PRIMARY KEY,
    manutencao_id INT NOT NULL REFERENCES manutencoes(id),
    tecnico_id    INT REFERENCES tecnicos(id),
    fornecedor_id INT REFERENCES fornecedores(id),
    descricao     TEXT,
    custo         DECIMAL(12,2),
    CONSTRAINT chk_tecnico_xor_fornecedor CHECK (
        (tecnico_id IS NOT NULL AND fornecedor_id IS NULL) OR
        (tecnico_id IS NULL     AND fornecedor_id IS NOT NULL)
    )
);

CREATE TABLE manutencao_anexos (
    id            SERIAL PRIMARY KEY,
    manutencao_id INT NOT NULL REFERENCES manutencoes(id),
    nome_arquivo  VARCHAR(255) NOT NULL,
    caminho       VARCHAR(500) NOT NULL,
    tipo          VARCHAR(30) CHECK (
                      tipo IN ('nota_fiscal','comprovante','outro')
                  ),
    valor         DECIMAL(12,2),
    enviado_em    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ÍNDICES

CREATE INDEX idx_equipamentos_poco    ON equipamentos(poco_id);
CREATE INDEX idx_manutencoes_equip    ON manutencoes(equipamento_id);
CREATE INDEX idx_manutencoes_status   ON manutencoes(status);
CREATE INDEX idx_mao_obra_manutencao  ON manutencao_mao_obra(manutencao_id);
CREATE INDEX idx_anexos_manutencao    ON manutencao_anexos(manutencao_id);
