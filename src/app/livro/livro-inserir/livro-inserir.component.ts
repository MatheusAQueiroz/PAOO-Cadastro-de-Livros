import { Component, EventEmitter, Output } from'@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{
  constructor(public livroService: LivroService) {}

  onAdicionarlivro(form: NgForm) {
    if (form.invalid) return;
    this.livroService.adicionarCliente(
      form.value.titulo,
      form.value.id,
      form.value.autor,
      form.value.nPaginas
    );
    form.resetForm();
  }
};
