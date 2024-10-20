import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagDTO } from '../dto/tag.dto';
import { PublicacaoDTO } from '../dto/publicacao.dto';
import { BlogConfig } from 'config/blog_config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseURL = BlogConfig.API_PATH;

  constructor(private http: HttpClient) { }

  fetchTags(): Observable<TagDTO> {
    const url: string = `${this.baseURL}/tags`;

    return this.http.get<TagDTO>(url);
  }

  fetchCurrentPublications(): Observable<PublicacaoDTO> {
    const url: string = `${this.baseURL}/publicacoes/getcurrent`;

    return this.http.get<PublicacaoDTO>(url);
  }

  fetchPublicationByURL(p_url: string) {
    const url: string = `${this.baseURL}/publicacoes/getbyurl/${p_url}`;

    return this.http.get<any>(url);
  }

  fetchPublicationsByTag(p_tag: string) {
    const url: string = `${this.baseURL}/publicacoes/getbytag/${p_tag}`;

    return this.http.get<any>(url);
  }

  fetchPublicationsByTipo(p_tipo: string) {
    const url: string = `${this.baseURL}/publicacoes/getbytype/${p_tipo}`;

    return this.http.get<any>(url);
  }
}
