import { ImagemProdutoDTO } from "./ImagemProdutoDTO.dto";
import { CaracteristicasProdutoDTO } from "./CaracteristicasProdutoDTO.dto";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AtualizaProdutoDTO {

    @IsUUID(undefined, {message: 'ID do produto inválido'})
    id: string;

    @IsUUID(undefined, {message: 'ID de usuário inválido'})
    usuarioId: string;

    @IsString()
    @IsNotEmpty({message: 'Nome do produto não pode ser vazio'})
    @IsOptional()
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, {message: 'O valor precisa ser maior que zero'})
    @IsOptional()
    valor: number;

    @IsNumber()
    @Min(0, {message: 'Quantidade mínima inválida'})
    @IsOptional()
    quantidade: number;

    @IsString()
    @IsNotEmpty({message: 'Descrição do produto não pode ser vazia '})
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    @IsOptional()
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => CaracteristicasProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicasProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    @IsOptional()
    imagens: ImagemProdutoDTO[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    categoria: string;

    @IsString()
    @IsString()
    @IsOptional()
    dataCriacao: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dataAtualizacoa: string;

}


