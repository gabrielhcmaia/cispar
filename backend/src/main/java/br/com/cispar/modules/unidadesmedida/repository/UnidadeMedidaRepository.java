package br.com.cispar.modules.unidadesmedida.repository;

import br.com.cispar.modules.unidadesmedida.domain.UnidadeMedidaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadeMedidaRepository extends JpaRepository<UnidadeMedidaModel, Integer> {
}
