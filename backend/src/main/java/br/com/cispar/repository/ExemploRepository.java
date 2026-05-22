package br.com.cispar.repository;

import br.com.cispar.domain.Exemplo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// ⚠️ Repository de exemplo — descartável.
@Repository
public interface ExemploRepository extends JpaRepository<Exemplo, Long> {
}
