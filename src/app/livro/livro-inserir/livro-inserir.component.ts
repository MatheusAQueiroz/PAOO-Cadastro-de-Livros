import { Component, EventEmitter, Output } from'@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{
  @Output() livroAdicionado = new EventEmitter<Livro>();

  titulo: string;
  id: string;
  autor: string;
  nPaginas: string;

  onAdicionarlivro() {
    const livro: Livro = {
      titulo: this.titulo,
      id: this.id,
      autor: this.autor,
      nPaginas: this.nPaginas
    }
    this.livroAdicionado.emit(livro);
  }

};
