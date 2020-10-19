import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivros() {
    return [...this.livros];
  }

  adicionarCliente(titulo: string, id: string, autor: string, nPaginas: string) {
    const livro: Livro = {
      titulo: titulo,
      id: id,
      autor: autor,
      nPaginas: nPaginas
    }
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros]);
  }

  getListaDeLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }
}
