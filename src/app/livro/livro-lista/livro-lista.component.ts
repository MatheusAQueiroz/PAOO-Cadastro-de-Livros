import { Component, Input, OnInit } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  @Input() livros: Livro[] = [];

  // livros = [
  //   {
  //     nome: 'José',
  //     fone: '11223344',
  //     email: 'jose@email.com'
  //   },
  //   {nome: 'Maria',
  //   fone: '22334455',
  //   email: 'maria@email.com'
  // }
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
