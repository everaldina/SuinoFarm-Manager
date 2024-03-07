export interface Suino {
    brinco: string;
    brinco_pai: string;
    brinco_mae: string;
    data_nascimento: Date;
    data_saida: Date;
    status: 'Ativo' | 'Vendido' | 'Morto';
    sexo: 'M' | 'F';
}
