package br.com.cispar.modules.cidade.controller;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import br.com.cispar.modules.cidade.dto.CidadeRequestDto;
import br.com.cispar.modules.cidade.dto.CidadeResponseDto;
import br.com.cispar.modules.cidade.service.impl.CidadeService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cidades")
public class CidadeController extends CrudController<CidadeModel, Integer, CidadeRequestDto, CidadeResponseDto> {

    private final CidadeService cidadeService;

    public CidadeController(CidadeService cidadeService) {
        this.cidadeService = cidadeService;
    }

    @Override
    protected CrudService<CidadeModel, Integer> getService() {
        return cidadeService;
    }

    @Override
    protected CidadeModel toEntity(CidadeRequestDto dto) {
        CidadeModel cidade = new CidadeModel();
        cidade.setNome(dto.nome());
        cidade.setUf(dto.uf());
        cidade.setRegiao(dto.regiao());
        return cidade;
    }

    @Override
    protected CidadeResponseDto toResponse(CidadeModel cidade) {
        return new CidadeResponseDto(
                cidade.getNome(),
                cidade.getUf(),
                cidade.getRegiao()
        );
    }

    @Override
    protected Integer extractId(CidadeModel cidade) {
        return cidade.getId();
    }
}
