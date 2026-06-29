package br.com.cispar.modules.cidade.repository;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CidadeRepository extends JpaRepository<CidadeModel, Integer> {
}
