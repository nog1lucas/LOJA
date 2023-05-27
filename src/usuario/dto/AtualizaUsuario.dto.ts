import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO {

    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message: 'o email infomado é inválido'})
    @EmailEhUnico({message: 'Já existe um usuário com este e-mail'})
    @IsOptional()
    email: string;

    @IsOptional()
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    senha: string;
}