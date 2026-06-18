ALTER TABLE fornecedores DROP CONSTRAINT IF EXISTS chk_fornecedores_cidade;
ALTER TABLE fornecedores DROP CONSTRAINT IF EXISTS chk_fornecedores_tipo;
ALTER TABLE fornecedores DROP COLUMN IF EXISTS cidade;
ALTER TABLE fornecedores DROP COLUMN IF EXISTS tipo;
ALTER TABLE fornecedores RENAME COLUMN documento TO cnpj;

ALTER TABLE unidades_medida DROP CONSTRAINT IF EXISTS chk_unidades_grandeza;
ALTER TABLE unidades_medida DROP COLUMN IF EXISTS grandeza;

ALTER TABLE tecnicos DROP CONSTRAINT IF EXISTS chk_tecnicos_funcao;
ALTER TABLE tecnicos DROP CONSTRAINT IF EXISTS chk_tecnicos_cargo;
ALTER TABLE tecnicos DROP COLUMN IF EXISTS funcao;
ALTER TABLE tecnicos DROP COLUMN IF EXISTS cargo;
