package br.com.cispar.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

// ⚠️ Entidade de exemplo — descartável. Serve apenas como referência da arquitetura.
@Entity
@Table(name = "exemplo")
@Getter
@Setter
@NoArgsConstructor
public class Exemplo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nome;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private OffsetDateTime criadoEm;

    @PrePersist
    protected void onCreate() {
        criadoEm = OffsetDateTime.now();
    }
}
