import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {
        usuarioRepository = new UsuarioRepository
    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuarios: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuarios.email;
        usuarioEntity.senha = dadosDoUsuarios.senha;
        usuarioEntity.nome = dadosDoUsuarios.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);
        return {
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            messagem: 'Usuario criado com sucesso' };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar()
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO ) {
       const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
       const usuarioLista = new ListaUsuarioDTO(
        usuarioAtualizado.id,
        usuarioAtualizado.nome
       )

       return {
        usuario: usuarioLista,
        messagem: 'usuário atualizado com sucesso',
       }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id)

        return {
            usuario: usuarioRemovido,
            messagem: 'usuário removido com sucesso'
        }
    }

}