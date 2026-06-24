package br.com.cispar.modules.tecnicos.controller;

import br.com.cispar.modules.tecnicos.domain.TecnicoModel;
import br.com.cispar.modules.tecnicos.dto.TecnicoRequestDto;
import br.com.cispar.modules.tecnicos.dto.TecnicoResponseDto;
import br.com.cispar.modules.tecnicos.service.impl.TecnicoService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tecnicos")
public class TecnicoController extends CrudController<TecnicoModel, Integer, TecnicoRequestDto, TecnicoResponseDto> {

    private final TecnicoService tecnicoService;

    public TecnicoController(TecnicoService tecnicoService) {
        this.tecnicoService = tecnicoService;
    }

    @Override
    protected CrudService<TecnicoModel, Integer> getService() {
        return tecnicoService;
    }

    @Override
    protected TecnicoModel toEntity(TecnicoRequestDto dto) {
        TecnicoModel tecnico = new TecnicoModel();
        tecnico.setNome(dto.nome());
        tecnico.setCargo(dto.cargo());
        tecnico.setFuncao(dto.funcao());
        tecnico.setTelefone(dto.telefone());
        tecnico.setEmail(dto.email());
        return tecnico;
    }

    @Override
    protected TecnicoResponseDto toResponse(TecnicoModel tecnico) {
        return new TecnicoResponseDto(
                tecnico.getId(),
                tecnico.getNome(),
                tecnico.getCargo(),
                tecnico.getFuncao(),
                tecnico.getTelefone(),
                tecnico.getEmail()
        );
    }

    @Override
    protected Integer extractId(TecnicoModel tecnico) {
        return tecnico.getId();
    }
}
