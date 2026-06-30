package br.com.cispar.modules.pocos.dto;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import br.com.cispar.modules.pocos.domain.Status;
import br.com.cispar.modules.pocos.domain.TipoLigacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PocosRequestDto(
        @NotBlank String identificacao,
        @NotBlank String localizacao,
        @NotBlank CidadeModel cidade,
        @NotNull BigDecimal diametro,
        @NotBlank String acessorios,
        @NotBlank Status status,
        @NotBlank String informacao,
        @NotBlank String eletrica,
        @NotNull BigDecimal medidaTubo,
        @NotNull BigDecimal nivelEstatico,
        @NotBlank TipoLigacao tipoLigacao,
        @NotBlank String altura
) {
}
