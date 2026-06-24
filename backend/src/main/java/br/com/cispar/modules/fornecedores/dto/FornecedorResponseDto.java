package br.com.cispar.modules.fornecedores.dto;

import br.com.cispar.modules.fornecedores.domain.Cidade;
import br.com.cispar.modules.fornecedores.domain.TipoFornecedor;

public record FornecedorResponseDto(
        Integer id,
        TipoFornecedor tipo,
        String nome,
        String documento,
        String telefone,
        Cidade cidade
) {
}
