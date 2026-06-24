ALTER TABLE tecnicos ADD COLUMN cargo VARCHAR(20);
ALTER TABLE tecnicos ADD COLUMN funcao VARCHAR(25);
UPDATE tecnicos SET cargo = 'TECNICO_JUNIOR' WHERE cargo IS NULL;
UPDATE tecnicos SET funcao = 'OPERACAO' WHERE funcao IS NULL;
ALTER TABLE tecnicos ALTER COLUMN cargo SET NOT NULL;
ALTER TABLE tecnicos ALTER COLUMN funcao SET NOT NULL;
ALTER TABLE tecnicos ADD CONSTRAINT chk_tecnicos_cargo
    CHECK (cargo IN ('TECNICO_JUNIOR', 'TECNICO_PLENO', 'TECNICO_SENIOR', 'ENCARREGADO', 'SUPERVISOR'));
ALTER TABLE tecnicos ADD CONSTRAINT chk_tecnicos_funcao
    CHECK (funcao IN ('MANUTENCAO_ELETRICA', 'HIDRAULICA', 'OPERACAO', 'INSTALACAO', 'INSPECAO'));

ALTER TABLE unidades_medida ADD COLUMN grandeza VARCHAR(15);
UPDATE unidades_medida SET grandeza = 'COMPRIMENTO' WHERE grandeza IS NULL;
ALTER TABLE unidades_medida ALTER COLUMN grandeza SET NOT NULL;
ALTER TABLE unidades_medida ADD CONSTRAINT chk_unidades_grandeza
    CHECK (grandeza IN ('COMPRIMENTO', 'VAZAO', 'POTENCIA', 'TENSAO', 'PRESSAO', 'TEMPO'));

ALTER TABLE fornecedores RENAME COLUMN cnpj TO documento;
ALTER TABLE fornecedores ADD COLUMN tipo VARCHAR(2);
ALTER TABLE fornecedores ADD COLUMN cidade VARCHAR(15);
UPDATE fornecedores SET tipo = 'PJ' WHERE tipo IS NULL;
UPDATE fornecedores SET cidade = 'MARINGA' WHERE cidade IS NULL;
ALTER TABLE fornecedores ALTER COLUMN tipo SET NOT NULL;
ALTER TABLE fornecedores ALTER COLUMN cidade SET NOT NULL;
ALTER TABLE fornecedores ADD CONSTRAINT chk_fornecedores_tipo
    CHECK (tipo IN ('PF', 'PJ'));
ALTER TABLE fornecedores ADD CONSTRAINT chk_fornecedores_cidade
    CHECK (cidade IN ('MARINGA', 'CIANORTE', 'UMUARAMA', 'PARANAVAI'));
