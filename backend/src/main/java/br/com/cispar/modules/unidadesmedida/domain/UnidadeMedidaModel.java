package br.com.cispar.modules.unidadesmedida.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "unidades_medida")
public class UnidadeMedidaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 50)
    private String nome;

    @Column(name = "sigla", length = 10)
    private String sigla;

    @Enumerated(EnumType.STRING)
    @Column(name = "grandeza", length = 15)
    private Grandeza grandeza;
}
