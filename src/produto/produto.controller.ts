import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoEntity } from "./produto.entity";
import { isUUID } from "class-validator";
import { randomUUID } from "crypto";
import { CriaProdutoDTO } from "./dto/CriaProdutoDTO.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { ListaUsuarioDTO } from "src/usuario/dto/ListaUsuario.dto";

@Controller('/produtos')
export class ProdutoController {
    
    constructor( private produtoRepository: ProdutoRepository) {
        produtoRepository = new ProdutoRepository
    }

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity()
        produtoEntity.id = randomUUID();
        produtoEntity.nome = dadosDoProduto.nome;
        produtoEntity.valor = dadosDoProduto.valor;
        produtoEntity.quantidade = dadosDoProduto.quantidade;
        produtoEntity.descricao = dadosDoProduto.descricao;
        produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
        produtoEntity.imagens = dadosDoProduto.imagens;
        
        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: new ListaProdutoDTO(produtoEntity.id, produtoEntity.nome),
            messagem: 'Produto cadastrado com sucesso'
        }
    }

    @Get()
    async listaProdutos() {
        return this.produtoRepository.listar()
    }

    @Put(':id')
    async atualizaProdutos(@Param('id') id:string, @Body() novosDados: AtualizaProdutoDTO ) {
        const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados)
        const produtoLista = new ListaProdutoDTO(
            produtoAtualizado.id,
            produtoAtualizado.nome
        )

        return {
            produto: produtoLista,
            messagem: 'produto atualizado com sucesso'
        }
        
    }

    @Delete(':id')
    async removeProdutos(@Param('id') id:string){
        const produtoRemovido = await this.produtoRepository.remove(id)

        return {
            produto: produtoRemovido,
            messagem: 'produto removido com sucesso'
        }
    }
}