import config from "../../config.js";
import mongoose from "mongoose";

class Contenedora {
  constructor(nombre, opcionSchema) {
    this.datos = [];
    this.uri = config.MONGO_DB.uri;
   
    const { Schema } = mongoose;
    this.productosSchema = new Schema(opcionSchema);
    this.conn = mongoose.createConnection(this.uri);
    this.bd = this.conn.model(nombre,this.productosSchema);
  }

  async save(object) {
    await new this.bd(object).save();
    return this.bd.find(object);
  }

  async updateById(producto) {
    try {
      
        const filter = { _id: producto.id };
     
      console.log('que hay aqui'+filter)
      await this.bd.findOneAndUpdate(filter, producto);
      return this.bd.findOne(filter);
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      
      
      return await this.bd.find({ });
    } catch (err) {
      throw new Error(err);
    }
  }
  async getById(id) {
    try {
      this.busqueda = await this.bd.findById({ _id: id });
      if (this.busqueda === null) {
        throw new Error("No existe el producto");
      }
      return this.busqueda;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(id) {
    try {
      const filter = { _id: id };
      const res = await this.bd.findOne(filter)      
      await this.bd.deleteOne(filter);
      return res
    } catch (err) {
      throw new Error(err);
      //console.log(err)
    }
  } //end deleteById

  async deleteAll() {
    try {
      
      await this.bd.deleteMany({});
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  } //end deleteAll
}

export default Contenedora;
