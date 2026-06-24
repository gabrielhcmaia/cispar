package br.com.cispar.modules.unidadesmedida.controller;

import br.com.cispar.modules.unidadesmedida.domain.UnidadeMedidaModel;
import br.com.cispar.modules.unidadesmedida.dto.UnidadeMedidaRequestDto;
import br.com.cispar.modules.unidadesmedida.dto.UnidadeMedidaResponseDto;
import br.com.cispar.modules.unidadesmedida.service.impl.UnidadeMedidaService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/unidades-medida")
public class UnidadeMedidaController extends CrudController<UnidadeMedidaModel, Integer, UnidadeMedidaRequestDto, UnidadeMedidaResponseDto> {

    private final UnidadeMedidaService unidadeMedidaService;

    public UnidadeMedidaController(UnidadeMedidaService unidadeMedidaService) {
        this.unidadeMedidaService = unidadeMedidaService;
    }

    @Override
    protected CrudService<UnidadeMedidaModel, Integer> getService() {
        return unidadeMedidaService;
    }

    @Override
    protected UnidadeMedidaModel toEntity(UnidadeMedidaRequestDto dto) {
        UnidadeMedidaModel unidade = new UnidadeMedidaModel();
        unidade.setNome(dto.nome());
        unidade.setSigla(dto.sigla());
        unidade.setGrandeza(dto.grandeza());
        return unidade;
    }

    @Override
    protected UnidadeMedidaResponseDto toResponse(UnidadeMedidaModel unidade) {
        return new UnidadeMedidaResponseDto(
                unidade.getId(),
                unidade.getNome(),
                unidade.getSigla(),
                unidade.getGrandeza()
        );
    }

    @Override
    protected Integer extractId(UnidadeMedidaModel unidade) {
        return unidade.getId();
    }
}
