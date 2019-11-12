import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, DetalleProducto } from '../interfaces/info-pagina-interface';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProducto();
   }


  private cargarProducto() {
    this.http.get('https://angular-html-abc32.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
      });
  }

  getProductId(id: string): Observable<DetalleProducto> {
    return this.http.get(`https://angular-html-abc32.firebaseio.com/productos/${id}.json`) as Observable<DetalleProducto> ;
  }
}
