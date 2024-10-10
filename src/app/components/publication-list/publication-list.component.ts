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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit() {
    this.tag_criteria = this.route.snapshot.paramMap.get('tag') || '';
    console.log('tag pesquisada', this.tag_criteria);

    if (this.tag_criteria) {
      this.fetchPublicacoesByTag();
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
