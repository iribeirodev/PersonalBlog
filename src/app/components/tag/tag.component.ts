import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { TagDTO } from 'src/app/dto/tag.dto';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }), // Inicializa com opacidade 0
        animate(200, style({ opacity: 1 })) // Anima para opacidade 1
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 })) // Anima para opacidade 0
      ])
    ])    
  ]
})
export class TagComponent {
  public loading = false;
  public tagsVisible = false;
  public tags: string[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.fetchTags();
  }

  private fetchTags() {
    this.loading = true;
    this.dataService.fetchTags().subscribe({
      next: (result: TagDTO) => {
        this.tags = result.data;
        this.tagsVisible = true;
      },
      error: (error) => {
        console.log('ERRO', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
