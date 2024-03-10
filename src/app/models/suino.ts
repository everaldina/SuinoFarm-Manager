export interface Suino {
    id: string;
    brincoAnimal: string;
    brincoPai: string;
    brincoMae: string;
    dataNascimento: string;
    dataSaida: string;
    status: 'Ativo' | 'Vendido' | 'Morto';
    sexo: 'M' | 'F';
}
