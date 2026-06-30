package br.com.cispar.modules.pocos.repository;

import br.com.cispar.modules.pocos.domain.PocosModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PocosRepository extends JpaRepository<PocosModel, Integer> {
}
