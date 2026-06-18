package br.com.cispar.modules.tecnicos.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Funcao {
    MANUTENCAO_ELETRICA("Manutenção Elétrica"),
    HIDRAULICA("Hidráulica"),
    OPERACAO("Operação"),
    INSTALACAO("Instalação"),
    INSPECAO("Inspeção");

    private final String label;

    Funcao(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Funcao fromValue(String value) {
        for (Funcao funcao : values()) {
            if (funcao.label.equals(value) || funcao.name().equals(value)) {
                return funcao;
            }
        }
        throw new IllegalArgumentException("Função inválida: " + value);
    }
}
