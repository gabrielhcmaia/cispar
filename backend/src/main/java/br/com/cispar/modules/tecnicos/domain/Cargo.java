package br.com.cispar.modules.tecnicos.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Cargo {
    TECNICO_JUNIOR("Técnico Júnior"),
    TECNICO_PLENO("Técnico Pleno"),
    TECNICO_SENIOR("Técnico Sênior"),
    ENCARREGADO("Encarregado"),
    SUPERVISOR("Supervisor");

    private final String label;

    Cargo(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Cargo fromValue(String value) {
        for (Cargo cargo : values()) {
            if (cargo.label.equals(value) || cargo.name().equals(value)) {
                return cargo;
            }
        }
        throw new IllegalArgumentException("Cargo inválido: " + value);
    }
}
