package br.com.cispar.modules.fornecedores.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Cidade {
    MARINGA("Maringá"),
    CIANORTE("Cianorte"),
    UMUARAMA("Umuarama"),
    PARANAVAI("Paranavaí");

    private final String label;

    Cidade(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Cidade fromValue(String value) {
        for (Cidade cidade : values()) {
            if (cidade.label.equals(value) || cidade.name().equals(value)) {
                return cidade;
            }
        }
        throw new IllegalArgumentException("Cidade inválida: " + value);
    }
}
