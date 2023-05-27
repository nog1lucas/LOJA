import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {

    private produtos: ProdutoEntity[] = [];

    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar() {
        return this.produtos;
    }

    private buscaPorId(id: string) {
        const possivelUsuario = this.produtos.find(
            produtoSalvo => produtoSalvo.id === id 
            );
        if(!possivelUsuario) {
            throw new Error('Produto não existe')
        }
        return possivelUsuario;
    }

    async atualiza(id,  dadosDeAtualizacao: Partial<ProdutoEntity>) {
        const produto = this.buscaPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id') {
                return;
            }
            
            produto[chave] = valor;
        })

        return produto;

    }

    async remove(id: string) {
        const produto = this.buscaPorId(id)
        this.produtos = this.produtos.filter(
             produtoSalvo => produtoSalvo.id !== id
        );

        return produto;
    }

}