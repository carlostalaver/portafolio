import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { DetalleProducto } from '../../interfaces/info-pagina-interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: DetalleProducto = null;
  productoId: string = null;
  constructor(private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametroUrl => {
        this.productoId = parametroUrl.id;
        this.productoService.getProductId(parametroUrl.id)
          .subscribe((produc: DetalleProducto) => {
            this.producto = produc;
          });
      });
  }

}
