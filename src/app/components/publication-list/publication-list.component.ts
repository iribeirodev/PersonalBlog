import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPublicacao, PublicacaoDTO } from 'src/app/dto/publicacao.dto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent {
  public publicacoes: ItemPublicacao[] = [];

  tag_criteria: string = '';
  tp_publicacao_criteria: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit() {
    this.tag_criteria = this.route.snapshot.paramMap.get('tag') || '';
    this.tp_publicacao_criteria = this.route.snapshot.paramMap.get('tipopublicacao') || '';
    
    if (this.tag_criteria) {
      this.fetchPublicacoesByTag();
      return;
    } else if (this.tp_publicacao_criteria) {
      this.fetchPublicacoesByTipo();
      return;
    }

    this.fetchPublicacoes();
  }

  fetchPublicacoesByTag() {
    this.dataService.fetchPublicationsByTag(this.tag_criteria).subscribe({
      next: (result: PublicacaoDTO) => {
        this.publicacoes = result.data;
      },
      error: (error) => {
        console.log('ERRO', error);
      },
      complete: () => {
      }
    });       
  }

  fetchPublicacoesByTipo() {
    this.dataService.fetchPublicationsByTipo(this.tp_publicacao_criteria).subscribe({
      next: (result: PublicacaoDTO) => {
        this.publicacoes = result.data;
      },
      error: (error) => {
        console.log('ERRO', error);
      },
      complete: () => {
      }
    });       
  }

  fetchPublicacoes() {
    this.dataService.fetchCurrentPublications().subscribe({
      next: (result: PublicacaoDTO) => {
        this.publicacoes = result.data;
      },
      error: (error) => {
        console.log('ERRO', error);
      },
      complete: () => {
      }
    });    
  }
}
