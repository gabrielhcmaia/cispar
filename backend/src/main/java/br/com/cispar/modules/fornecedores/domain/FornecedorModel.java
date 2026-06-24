package br.com.cispar.modules.fornecedores.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "fornecedores")
public class FornecedorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", length = 2)
    private TipoFornecedor tipo;

    @Column(name = "nome", length = 150)
    private String nome;

    @Column(name = "documento", length = 18)
    private String documento;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(name = "cidade", length = 15)
    private Cidade cidade;
}
