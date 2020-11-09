import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient) {}

  getLivro(idLivro: string) {
    return this.httpClient.get<{_id: string, titulo: string, id: string, autor: string, nPaginas: string}>(`http://localhost:3000/api/livros/${idLivro}`);
  }

  getLivros(): void {
    this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros')
    .pipe(map((dados) => {
      return dados.livros.map(livro => {
        return {
          _id: livro._id,
          autor: livro.autor,
          id: livro.id,
          titulo: livro.titulo,
          nPaginas: livro.nPaginas
        }
      })
    }))
    .subscribe( (livros) => {
      this.livros = livros;
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }

  removerLivro(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe( () => {
      this.livros = this.livros.filter( (liv) => {
        return liv._id !== id;
      })
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

  atualizarLivro(_id: string, titulo: string, id: string, autor: string, nPaginas: string) {
    const livro: Livro = {_id, titulo, id, autor, nPaginas};
    this.httpClient.put(`http://localhost:3000/api/livros/${_id}`, livro)
    .subscribe((res => {
      const copia = [...this.livros];
      const indice = copia.findIndex(liv => liv._id === livro._id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
    }))
  }

  adicionarLivro(titulo: string, id: string, autor: string, nPaginas: string) {
    const livro: Livro = {
      _id: null,
      titulo: titulo,
      id: id,
      autor: autor,
      nPaginas: nPaginas
    }
    this.httpClient.post<{mensagem: string, _id: string}>('http://localhost:3000/api/livros', livro).subscribe( (dados) => {
      livro._id = dados._id
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }

  getListaDeLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }
}
