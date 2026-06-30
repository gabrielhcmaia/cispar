package br.com.cispar.modules.pocos.domain;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import br.com.cispar.modules.unidadesmedida.domain.UnidadeMedidaModel;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "pocos")
public class PocosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "identificacao", length = 10)
    private String identificacao;

    @Column(name = "localizacao", length = 150)
    private String localizacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id", nullable = false)
    private CidadeModel cidade;

    @Column(name = "diametro", precision = 10, scale = 2)
    private BigDecimal diametro;

    @Column(name = "acessorios", length = 150)
    private String acessorios;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private Status status;

    @Column(name = "informacao", length = 250)
    private String informacao;

    @Column(name = "cabo_eletrico", length = 100)
    private String caboEletrico;

    @Column(name = "tubo_medida", precision = 10, scale = 2)
    private BigDecimal medidaTubo;

    @Column(name = "nivel_estatico", precision = 10, scale = 2)
    private BigDecimal nivelEstatico;

    @Enumerated(EnumType.STRING)
    @Column(name = "ligacao", length = 100)
    private TipoLigacao tipoLigacao;

    @Column(name = "altura", length = 3)
    private String altura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_diametro_id")
    private UnidadeMedidaModel unidadeDiametro;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;
}
