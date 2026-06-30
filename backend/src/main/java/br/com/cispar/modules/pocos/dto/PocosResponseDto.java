package br.com.cispar.modules.pocos.dto;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import br.com.cispar.modules.pocos.domain.Status;
import br.com.cispar.modules.pocos.domain.TipoLigacao;

import java.math.BigDecimal;

public record PocosResponseDto(
        String identificacao,
        String localizacao,
        CidadeModel cidade,
        BigDecimal diametro,
        BigDecimal nivelEstatico,
        TipoLigacao tipoLigacao,
        Status status
){
}
