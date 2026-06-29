package br.com.cispar.modules.cidade.domain;

import br.com.cispar.modules.pocos.domain.PocosModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "cidades")
public class CidadeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "uf", length = 2)
    @Enumerated(EnumType.STRING)
    private Uf uf;

    @Column(name = "regiao", length = 100)
    private String regiao;

    @OneToMany(mappedBy = "cidade", fetch = FetchType.LAZY)
    private List<PocosModel> pocos;
}
