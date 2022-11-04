import { Collection, opcionSchema } from "../../models/carrito.models.js";

import Contenedora from "../../contenedor/contenedora.mongodb.js";
import Productos from "../../dao/productos/index.js";

class Carrito extends Contenedora {
  constructor() {
    super(Collection, opcionSchema);
    this.articulos = Productos;
  }
  async setNewCar(id, cantidad) {
    try {
      this.productos = 0;
      this.contenedor = {};
      this.total = 0;
      const object = await this.articulos.getById(id);
      const precio = Number(object.precio);
      const stock = Number(object.stock);
      console.log("que hay aqui" + Number(object.stock));
      if (Number(object.stock) >= cantidad) {
        this.total = this.total + cantidad * precio;
        object.stock = stock - cantidad;
        await this.articulos.updateById(object);
        object.stock = cantidad;
        return await this.save({ carrito: object, total: this.total });
      } else {
        console.log("lo sentimos no hay stock");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async setAddProductCar(idCarrito, idArticulo, cantidad) {
    try {
      const carritoViejo = await this.getById(idCarrito);
      const object = await this.articulos.getById(idArticulo);
      const precio = Number(object.precio);
      const stock = Number(object.stock);
      this.total = carritoViejo.total;
      if (Number(object.stock) >= cantidad) {
        this.total = this.total + cantidad * precio;
        object.stock = stock - cantidad;
        await this.articulos.updateById(object);
        object.stock = cantidad;

        this.updateById({
          id: idCarrito,
          total: this.total,
          $push: { carrito: object },
        });
        return carritoViejo;
      } else {
        console.log("lo sentimos no hay stock");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async setDellProductCar(idCarrito, idArticulo) {
    try {
      const object = await this.articulos.getById(idArticulo);
      const precio = Number(object.precio);
      const stock = Number(object.stock);
      const carritoViejo = await this.getById(idCarrito);

      this.updateById({
        id: idCarrito,
        total: this.total,
        $pull: { carrito: { _id: idArticulo } },
      });
      return await this.getById(idCarrito);
    } catch (err) {
      throw new Error(err);
    }
  }

  async setDellCar() {
    delete this.carrito;
    this.productos = 0;
    this.contenedor = {};
    this.total = 0;
  }
  async setDellCarById(id) {
    await this.deleteById(id);
    
    return {"mensaje":'Carrito Eliminado'}
    //return await this.articulos.updateById(articuloViejo);
  }

  async getAllCar(id) {
    const datos = await this.getById(id);

    return datos;
  }
  async getProductosTotal() {
    return this.productos;
  }
  async getPrecioTotal() {
    return this.total;
  }
}

export default Carrito;
