package br.com.cispar.modules.users.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Perfil {
    OPERADOR("Operador"),
    ADMINISTRADOR("Administrador"),
    VISUALIZADOR("Visualizador");

    private final String label;

    Perfil(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Perfil fromValue(String value) {
        for (Perfil perfil : values()) {
            if (perfil.label.equals(value) || perfil.name().equals(value)) {
                return perfil;
            }
        }
        throw new IllegalArgumentException("Perfil inválido: " + value);
    }
}
