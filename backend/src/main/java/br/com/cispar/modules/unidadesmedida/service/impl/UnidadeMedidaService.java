package br.com.cispar.modules.unidadesmedida.service.impl;

import br.com.cispar.modules.unidadesmedida.domain.UnidadeMedidaModel;
import br.com.cispar.modules.unidadesmedida.repository.UnidadeMedidaRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UnidadeMedidaService extends CrudService<UnidadeMedidaModel, Integer> {

    private final UnidadeMedidaRepository unidadeMedidaRepository;

    public UnidadeMedidaService(UnidadeMedidaRepository unidadeMedidaRepository) {
        this.unidadeMedidaRepository = unidadeMedidaRepository;
    }

    @Override
    protected JpaRepository<UnidadeMedidaModel, Integer> getRespository() {
        return unidadeMedidaRepository;
    }

    @Override
    public UnidadeMedidaModel update(Integer id, UnidadeMedidaModel entity) {
        entity.setId(id);
        return super.update(id, entity);
    }
}
