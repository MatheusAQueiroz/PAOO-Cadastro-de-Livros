import { Component, OnInit } from'@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent implements OnInit{
  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      id: new FormControl (null, {
        validators: [Validators.required]
      }),
      autor: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      nPaginas: new FormControl (null, {
        validators: [Validators.required]
      })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")) {
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.estaCarregando = true;
        this.livroService.getLivro(this.idLivro).subscribe( dadosLiv => {
          this.estaCarregando = false;
          this.livro = {
            _id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            id: dadosLiv.id,
            autor: dadosLiv.autor,
            nPaginas: dadosLiv.nPaginas
          }
          this.form.setValue({
            titulo: this.livro.titulo,
            id: this.livro.id,
            autor: this.livro.autor,
            nPaginas: this.livro.nPaginas
          })
        })
      }
      else {
        this.modo = "criar";
        this.idLivro = null;
      }
    });
  }
  constructor(public livroService: LivroService, public route: ActivatedRoute) {}

  onSalvarLivro() {
    if (this.form.invalid) return;
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.livroService.adicionarLivro(
        this.form.value.titulo,
        this.form.value.id,
        this.form.value.autor,
        this.form.value.nPaginas
      );
    }
    else {
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.id,
        this.form.value.autor,
        this.form.value.nPaginas
      )
    }
    this.form.reset();
  }
};
