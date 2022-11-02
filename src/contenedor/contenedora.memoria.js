
class Contenedora {
  constructor() {
  
    this.datos = [];
  }

  async save(object) {
    try {
      
      object.id = Number(this.datos[this.datos.length - 1].id) + 1;
      this.datos.push(object);     
      return this.datos[this.datos.length - 1];
    } catch (err) {
      object.id = 1;     
      return object;
    }
  }

  async updateById(producto) {
    try {
        this.busqueda = this.datos.find((object) => {
        if (object.id == producto.id) {
          object.id = Number(producto.id);
          object.timestamp=Date.now();
          object.nombre = producto.nombre;
          object.descripcion=producto.descripcion;
          object.codigo=producto.codigo;
          object.url = producto.url;
          object.precio = Number(producto.precio);
          object.stock = Number(producto.stock);

          return object;
        }
      });
       
      
      return this.busqueda;
    } catch (err) {     
      throw new Error(err);
    }
  }
  async getById(id) {
    try {
      
      
      this.busqueda = this.datos.find((object) => {
        
        if (Number(object.id) === Number(id)) {
          return object;
        }
      });
      if(this.busqueda === undefined ){
        
        throw new Error('No existe el producto')
       }

      return  this.busqueda;
    } catch (err) {      
      throw new Error(err);
    }
  }

  idValidRandom(datos, key) {
    try {
      let i = Math.ceil(Math.random() * key);
      let valid = datos.filter((object) => {
        if (object.id === i) {
          return object;
        }
      });

      if (valid === undefined) {
        return this.idValidRandom(datos, key);
      } else {
        return valid;
      }
    } catch (err) {
      
      throw new Error(err);
    }
  }

  async getByIdRandom() {
    try {
     
      let key = this.datos[0].id;
      this.datos.find((object) => {
        if (key <= object.id) {
          key = object.id;
        }
      });

      this.Random = this.idValidRandom(this.datos, key);

     
      return this.Random;
    } catch (err) {
   
      throw new Error(err);
    }
  }

  getAll() {
  
    return  this.datos ;
  
  } // end  getAll

  async deleteById(id) {
    try {
      
      let sinEliminar = this.datos.filter((object) => {
        if (id !== Number(object.id)) {
          return object;
        }
      });
      let eliminado = this.datos.filter((object) => {
        if (id == Number(object.id)) {
          return object;
        }
      });

      if (eliminado === undefined) {
        console.log("No existe es id");
      } else {
        
        console.log(
          `Eliminando...  id:${eliminado[0].id}::${eliminado[0].title}`
        );
        this.datos=eliminado
        return eliminado[0]
      }
    } catch (err) {
      throw new Error(err);
      //console.log(err)
    }
  } //end deleteById

  deleteAll() {
    try {
      this.datos=[];
   
    } catch (err) {
      console.error(err);
      return err;
    }
  } //end deleteAll
}

export default Contenedora;
