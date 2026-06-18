package br.com.cispar.modules.fornecedores.controller;

import br.com.cispar.modules.fornecedores.domain.FornecedorModel;
import br.com.cispar.modules.fornecedores.dto.FornecedorRequestDto;
import br.com.cispar.modules.fornecedores.dto.FornecedorResponseDto;
import br.com.cispar.modules.fornecedores.service.impl.FornecedorService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController extends CrudController<FornecedorModel, Integer, FornecedorRequestDto, FornecedorResponseDto> {

    private final FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @Override
    protected CrudService<FornecedorModel, Integer> getService() {
        return fornecedorService;
    }

    @Override
    protected FornecedorModel toEntity(FornecedorRequestDto dto) {
        FornecedorModel fornecedor = new FornecedorModel();
        fornecedor.setTipo(dto.tipo());
        fornecedor.setNome(dto.nome());
        fornecedor.setDocumento(dto.documento());
        fornecedor.setTelefone(dto.telefone());
        fornecedor.setCidade(dto.cidade());
        return fornecedor;
    }

    @Override
    protected FornecedorResponseDto toResponse(FornecedorModel fornecedor) {
        return new FornecedorResponseDto(
                fornecedor.getId(),
                fornecedor.getTipo(),
                fornecedor.getNome(),
                fornecedor.getDocumento(),
                fornecedor.getTelefone(),
                fornecedor.getCidade()
        );
    }

    @Override
    protected Integer extractId(FornecedorModel fornecedor) {
        return fornecedor.getId();
    }
}
