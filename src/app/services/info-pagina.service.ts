import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPaginaInterface } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info = {}  as InfoPaginaInterface;
  cargada =  false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInformacion();
    this.cargarEquipo();
  }

  private cargarInformacion() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPaginaInterface) => {
      this.info = resp;
      this.cargada = true;
    });
  }


   private cargarEquipo(){
    this.http.get( 'https://angular-html-abc32.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.equipo = resp;
      });
   }
}
