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
  productosFiltrados: Producto[] = null;

  constructor(private http: HttpClient) {
    this.cargarProducto();
   }


  private cargarProducto() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-abc32.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductId(id: string): Observable<DetalleProducto> {
    return this.http.get(`https://angular-html-abc32.firebaseio.com/productos/${id}.json`) as Observable<DetalleProducto> ;
  }



  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProducto().then( () => {
        this.filtarProducto(termino);
      });
    } else {
      this.filtarProducto(termino);
    }
  }

  filtarProducto(termino: string) {
   this.productosFiltrados = [];
   termino = termino.toLocaleLowerCase();
   if (termino) {
    this.productosFiltrados =  this.productos.filter( p => {
      return (p.categoria.toLocaleLowerCase().indexOf(termino) >= 0 || p.titulo.toLocaleLowerCase().indexOf(termino) >= 0);
    });
   } else {
    this.productosFiltrados = this.productos;
   }
   console.log(' filtrados', this.productosFiltrados);
  }
}
