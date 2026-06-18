package br.com.cispar.modules.unidadesmedida.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Grandeza {
    COMPRIMENTO("Comprimento"),
    VAZAO("Vazão"),
    POTENCIA("Potência"),
    TENSAO("Tensão"),
    PRESSAO("Pressão"),
    TEMPO("Tempo");

    private final String label;

    Grandeza(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Grandeza fromValue(String value) {
        for (Grandeza grandeza : values()) {
            if (grandeza.label.equals(value) || grandeza.name().equals(value)) {
                return grandeza;
            }
        }
        throw new IllegalArgumentException("Grandeza inválida: " + value);
    }
}
