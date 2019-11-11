import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPaginaInterface } from '../insterfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info = {}  as InfoPaginaInterface;
  cargada =  false;

  constructor(private http: HttpClient) {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPaginaInterface) => {
        console.log(resp);
        this.info = resp;
        this.cargada = true;
      });
  }
}
