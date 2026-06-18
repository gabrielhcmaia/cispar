package br.com.cispar.modules.tecnicos.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tecnicos")
public class TecnicoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 100)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "cargo", length = 20)
    private Cargo cargo;

    @Enumerated(EnumType.STRING)
    @Column(name = "funcao", length = 25)
    private Funcao funcao;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "email", length = 150)
    private String email;
}
