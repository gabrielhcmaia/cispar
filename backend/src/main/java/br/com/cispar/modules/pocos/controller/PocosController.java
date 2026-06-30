package br.com.cispar.modules.pocos.controller;

import br.com.cispar.modules.pocos.domain.PocosModel;
import br.com.cispar.modules.pocos.dto.PocosRequestDto;
import br.com.cispar.modules.pocos.dto.PocosResponseDto;
import br.com.cispar.modules.pocos.service.impl.PocosService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pocos")
public class PocosController extends CrudController<PocosModel, Integer, PocosRequestDto, PocosResponseDto>{
    private final PocosService pocosService;

    public PocosController(PocosService pocosService) {
        super();
        this.pocosService = pocosService;
    }

    @Override
    protected CrudService<PocosModel, Integer> getService() {
        return pocosService;
    }

    @Override
    protected PocosModel toEntity(PocosRequestDto dto) {
        PocosModel pocos = new PocosModel();
        pocos.setIdentificacao(dto.identificacao());
        pocos.setLocalizacao(dto.localizacao());
        pocos.setCidade(dto.cidade());
        pocos.setDiametro(dto.diametro());
        pocos.setAcessorios(dto.acessorios());
        pocos.setStatus(dto.status());
        pocos.setInformacao(dto.informacao());
        pocos.setCaboEletrico(dto.eletrica());
        pocos.setMedidaTubo(dto.medidaTubo());
        pocos.setNivelEstatico(dto.nivelEstatico());
        pocos.setTipoLigacao(dto.tipoLigacao());
        pocos.setAltura(dto.altura());

        return pocos;
    }

    @Override
    protected PocosResponseDto toResponse(PocosModel pocos) {
        return new PocosResponseDto(
                pocos.getIdentificacao(),
                pocos.getLocalizacao(),
                pocos.getCidade(),
                pocos.getDiametro(),
                pocos.getNivelEstatico(),
                pocos.getTipoLigacao(),
                pocos.getStatus()
        );
    }

    @Override
    protected Integer extractId(PocosModel pocos) {
        return pocos.getId();
    }


}
