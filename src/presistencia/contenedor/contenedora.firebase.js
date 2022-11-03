import admin from "firebase-admin";
import config from "../../config.js";

class Contenedora {
  constructor() {

    this.datos = [];


admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  databaseURL:process.env.FIREBASE_URL
});   

  console.log('Base conectada')
   
    this.query = admin.firestore().collection('Productos')
    ;
  }

  async save(object) {
     this.query.doc().create(object);
    const data =await this.query.where("codigo","==",object.codigo).get();
   let re=null
    await data.forEach((querySnapshot) => {
    
    re={
         nombre: querySnapshot.data().nombre,
         descripcion: querySnapshot.data().descripcion,
         codigo: querySnapshot.data().codigo,
         url: querySnapshot.data().url,
         precio: querySnapshot.data().precio,
         stock: querySnapshot.data().stock
         
       }
      }
  
    
    );
    console.log(re)
    return re
     
  }

  async updateById(producto) {
    try {
      const filter = { _id: producto.id };
      await this.bd.findOneAndUpdate(filter, producto);
      return this.bd.findOne(filter);
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      
      console.log('Entro')
      return await this.query.doc().get()
    } catch (err) {
      throw new Error(err);
    }
  }
  async getById(id) {
    try {
      this.busqueda = await this.bd.findOne({ _id: id });
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
