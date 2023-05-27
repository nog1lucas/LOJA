import { ImagemProdutoDTO } from "./ImagemProdutoDTO.dto";
import { CaracteristicasProdutoDTO } from "./CaracteristicasProdutoDTO.dto";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CriaProdutoDTO {

    @IsUUID(undefined, {message: 'ID de usuário inválido'})
    usuarioId: string;
    
    @IsString()
    @IsNotEmpty({message: 'Nome do produto não pode ser vazio'})
    nome: string;
    
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, {message: 'O valor precisa ser maior que zero'})
    valor: number;

    @IsNumber()
    @Min(0, {message: 'Quantidade mínima inválida'})
    quantidade: number;

    @IsString()
    @IsNotEmpty({message: 'Descrição do produto não pode ser vazia '})
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => CaracteristicasProdutoDTO)
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsString()
    @IsNotEmpty()
    categoria: string;

    @IsString()
    @IsString()
    dataCriacao: string;

    @IsString()
    @IsNotEmpty()
    dataAtualizacao: string;

}


