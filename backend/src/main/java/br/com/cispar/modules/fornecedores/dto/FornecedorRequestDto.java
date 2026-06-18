package br.com.cispar.modules.fornecedores.dto;

import br.com.cispar.modules.fornecedores.domain.Cidade;
import br.com.cispar.modules.fornecedores.domain.TipoFornecedor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FornecedorRequestDto(
        @NotNull TipoFornecedor tipo,
        @NotBlank String nome,
        @NotBlank String documento,
        @NotBlank String telefone,
        @NotNull Cidade cidade
) {
}
